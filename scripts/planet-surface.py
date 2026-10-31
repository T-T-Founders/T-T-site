"""
Renders the planet surface used by the hero (public/images/hero/planet-surface.webp).

A rocky procedural heightmap (fractal + ridged value noise, a few soft craters)
lit by a low copper light from the upper left, as if the sun sits just behind
the horizon. The image only covers the cap of the planet that is visible in the
hero; app/globals.css places it there and darkens it toward the planet's
interior. Run: python3 scripts/planet-surface.py
"""
import numpy as np
from PIL import Image

W, H = 2400, 1200
rng = np.random.default_rng(7)


def value_noise(cells_x, cells_y):
    grid = rng.random((cells_y + 1, cells_x + 1)).astype(np.float32)
    img = Image.fromarray(grid, mode="F").resize((W, H), Image.BICUBIC)
    return np.asarray(img)


def fractal(base, octaves, gain=0.5, ridged=False):
    total = np.zeros((H, W), np.float32)
    amp, norm = 1.0, 0.0
    for o in range(octaves):
        n = value_noise(base * 2**o, max(1, base * 2**o // 2))
        if ridged:
            n = 1.0 - np.abs(n * 2 - 1)
            n = n * n
        total += n * amp
        norm += amp
        amp *= gain
    return total / norm


# terrain: rolling base + ridges + fine grit
h = 0.55 * fractal(6, 6) + 0.35 * fractal(10, 6, ridged=True) + 0.10 * fractal(64, 3)

# a few soft craters
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
for _ in range(14):
    cx, cy = rng.uniform(0, W), rng.uniform(0, H)
    r = rng.uniform(30, 140)
    d = np.sqrt((xx - cx) ** 2 + ((yy - cy) * 1.9) ** 2) / r  # flattened: seen at a grazing angle
    bowl = np.clip(1 - d**2, 0, 1)
    rim = np.exp(-((d - 1.0) ** 2) / 0.02)
    h += (-0.10 * bowl + 0.05 * rim) * rng.uniform(0.5, 1.0)

# hillshade with a low light from the upper left
gy, gx = np.gradient(h * 140.0)
nx, ny, nz = -gx, -gy, np.ones_like(h)
n = np.sqrt(nx**2 + ny**2 + nz**2)
light = np.array([-0.62, -0.55, 0.56])
light /= np.linalg.norm(light)
shade = np.clip((nx * light[0] + ny * light[1] + nz * light[2]) / n, 0, 1)

# Where each pixel sits on the planet. The image spans planet x 14%..52% and
# y 0..(0.38 * H / W) of the diameter (see .planet in app/globals.css);
# r is the distance from the planet's center, 1 at the rim.
px = 0.14 + 0.38 * xx / W
py = 0.38 * yy / W
r = np.sqrt((px - 0.5) ** 2 + (py - 0.5) ** 2) / 0.5

# light is strongest at the rim and falls off inward and toward the right
fall = np.clip((r - 0.8) / 0.2, 0, 1) ** 1.4 * (1 - 0.55 * xx / W)
v = np.clip(shade**2.2 * (0.25 + 0.95 * fall) + 0.04 * h, 0, 1)

# palette: planet shadow -> burnt copper -> lit copper (same hues as the CSS tokens)
stops = np.array([0.0, 0.35, 0.7, 1.0])
cols = np.array([
    [16, 12, 13],
    [52, 24, 16],
    [150, 64, 30],
    [236, 128, 72],
], np.float32)
rgb = np.stack([np.interp(v, stops, cols[:, c]) for c in range(3)], -1)

# Only the band just inside the rim is ever seen: outside the circle is sky and
# deep inside is covered by the CSS shadow. Flatten both so the file stays small.
keep = np.clip((r - 0.82) / 0.03, 0, 1) * np.clip((1.005 - r) / 0.01, 0, 1)
rgb = rgb * keep[..., None] + cols[0] * (1 - keep[..., None])

Image.fromarray(rgb.clip(0, 255).astype(np.uint8)).save(
    "public/images/hero/planet-surface.webp", quality=72, method=6
)
print("ok")
