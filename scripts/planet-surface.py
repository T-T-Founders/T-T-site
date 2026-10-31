"""
Renders the planet surface used by the hero (public/images/hero/planet-surface.webp).

A procedural heightmap (fractal + ridged noise, a few soft craters) lit by a
low copper light from the upper left, as if the sun sits just behind the
horizon. The image only covers the cap of the planet that is visible in the
hero; app/globals.css places it there and darkens it toward the planet's
interior. Run: python3 scripts/planet-surface.py
"""
import numpy as np
from PIL import Image

W, H = 1600, 800
rng = np.random.default_rng(7)


def spectral(beta, lo=0.0, hi=1.0, squash=0.45):
    """1/f^beta noise, band-limited, with features flattened vertically
    (the surface is seen at a grazing angle)."""
    white = rng.standard_normal((H, W)).astype(np.float32)
    fy = np.fft.fftfreq(H)[:, None] * squash
    fx = np.fft.fftfreq(W)[None, :]
    f = np.sqrt(fx**2 + fy**2)
    f[0, 0] = 1.0
    amp = f ** (-beta / 2)
    band = (f >= lo * 0.5) & (f <= hi * 0.5)
    out = np.real(np.fft.ifft2(np.fft.fft2(white) * amp * band))
    out -= out.min()
    return out / out.max()


def ridged(n):
    r = 1.0 - np.abs(n * 2 - 1)
    return r**3


# terrain: rolling base + ridges (dunes, cracks) + fine grit
base = spectral(3.6)
ridges = ridged(spectral(3.0, lo=0.004, hi=0.08))
detail = spectral(2.4, lo=0.02)
h = 0.6 * base + 0.18 * ridges + 0.22 * detail

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
gy, gx = np.gradient(h * 200.0)
nx, ny, nz = -gx, -gy, np.ones_like(h)
n = np.sqrt(nx**2 + ny**2 + nz**2)
light = np.array([-0.62, -0.55, 0.56])
light /= np.linalg.norm(light)
shade = np.clip((nx * light[0] + ny * light[1] + nz * light[2]) / n, 0, 1)

# light falls off slightly toward the right; the falloff away from the rim is
# done in CSS, because the rim crosses this image diagonally
fall = 1 - 0.35 * xx / W
v = np.clip(shade**1.8 * (0.3 + 0.62 * fall) + 0.04 * h, 0, 1)

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
# The image spans planet x 14%..52% and y 0..(0.38 * H / W) of the diameter
# (see .planet in app/globals.css).
px = 0.14 + 0.38 * xx / W
py = 0.38 * yy / W
r = np.sqrt((px - 0.5) ** 2 + (py - 0.5) ** 2) / 0.5
keep = np.clip((r - 0.82) / 0.03, 0, 1) * np.clip((1.005 - r) / 0.01, 0, 1)
rgb = rgb * keep[..., None] + cols[0] * (1 - keep[..., None])

Image.fromarray(rgb.clip(0, 255).astype(np.uint8)).save(
    "public/images/hero/planet-surface.webp", quality=50, method=6
)
print("ok")
