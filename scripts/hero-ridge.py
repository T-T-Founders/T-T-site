"""
Renders the foreground ridge of the hero (public/images/hero/ridge.webp): a dark
rocky hilltop in the lower left, as if the viewer stands on it and looks out at
the planet. Same rock language as scripts/planet-surface.py (fractal + ridged
value noise), lit from behind the horizon, with a copper rim along the crest.
Transparent above the crest. Run: python3 scripts/hero-ridge.py
"""
import numpy as np
from PIL import Image

W, H = 1600, 640
rng = np.random.default_rng(11)


def value_noise(cells_x, cells_y, w=W, h=H):
    grid = rng.random((cells_y + 1, cells_x + 1)).astype(np.float32)
    return np.asarray(Image.fromarray(grid, mode="F").resize((w, h), Image.BICUBIC))


def fractal(base, octaves, gain=0.5, ridged=False):
    total = np.zeros((H, W), np.float32)
    amp, norm = 1.0, 0.0
    for o in range(octaves):
        n = value_noise(base * 2**o, max(1, base * 2**o // 2))
        if ridged:
            n = (1.0 - np.abs(n * 2 - 1)) ** 2
        total += n * amp
        norm += amp
        amp *= gain
    return total / norm


def profile_noise(cells, octaves):
    out = np.zeros(W, np.float32)
    amp, norm = 1.0, 0.0
    for o in range(octaves):
        g = rng.random(cells * 2**o + 1).astype(np.float32)
        n = np.interp(np.linspace(0, len(g) - 1, W), np.arange(len(g)), g)
        out += (n * 2 - 1) * amp
        norm += amp
        amp *= 0.5
    return out / norm


# crest line: high on the left, falling away to the right, broken by rocks
x = np.arange(W, dtype=np.float32)
t = x / (W - 1)
crest = H * (0.14 + 0.92 * t**1.3)
crest += profile_noise(4, 7) * H * 0.10 * (1 - t) ** 0.5
# crags: sharp rocks sticking up out of the line
crest -= np.abs(profile_noise(18, 4)) ** 1.5 * H * 0.09 * (1 - t) ** 0.7
crest += profile_noise(80, 2) * H * 0.006
crest = np.clip(crest, 0, H + 4)

yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
depth = yy - crest[None, :]  # pixels below the crest
alpha = np.clip(depth + 0.5, 0, 1)

# rock relief inside the hill, lit from the upper right (the glow behind the horizon)
h = 0.7 * fractal(7, 6) + 0.2 * fractal(12, 5, ridged=True) + 0.10 * fractal(70, 3)
gy, gx = np.gradient(h * 150.0)
nx, ny, nz = -gx, -gy, np.ones_like(h)
n = np.sqrt(nx**2 + ny**2 + nz**2)
light = np.array([0.7, -0.5, 0.5])
light /= np.linalg.norm(light)
shade = np.clip((nx * light[0] + ny * light[1] + nz * light[2]) / n, 0, 1)

# relief reads only near the crest; the body of the hill stays near black
near = np.exp(-np.clip(depth, 0, None) / 110.0)
v = shade**2.0 * (0.06 + 0.8 * near)

# copper rim along the crest, stronger where the edge faces the light (right)
slope = np.gradient(crest)
facing = np.clip(0.6 + slope[None, :] * 0.35, 0.3, 1.0)
rim = (np.exp(-np.clip(depth, 0, None) / 3.5) * 1.1 + np.exp(-np.clip(depth, 0, None) / 18.0) * 0.25) * facing

base = np.array([9, 7, 8], np.float32)
rock = np.array([120, 52, 26], np.float32)
glow = np.array([246, 160, 104], np.float32)
rgb = base + (rock - base) * v[..., None]
rgb = rgb + (glow - rgb) * np.clip(rim, 0, 1)[..., None]

rgba = np.dstack([rgb.clip(0, 255), alpha * 255]).astype(np.uint8)
Image.fromarray(rgba, mode="RGBA").save("public/images/hero/ridge.webp", quality=70, method=6)
print("ok")
