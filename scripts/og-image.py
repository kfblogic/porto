"""Generate public/og-image.png (1200x630) — preview link WhatsApp/sosmed.

Kartu punch merah: nama dipunch dalam kode Hollerith (sama dengan
src/lib/hollerith.js), nama besar, headline, foto di stub.

Pakai: python scripts/og-image.py <folder-font>
Folder font berisi Archivo_wdth_wght_118_900.ttf, Archivo_wdth_wght_87_700.ttf,
Doto_wght_800.ttf (instance statis dari Google Fonts).
"""
import sys
from pathlib import Path

import pymupdf

FONTS = Path(sys.argv[1])
ROOT = Path(__file__).resolve().parent.parent
W, H = 1200, 630
DESK, STOCK, INK = (0x16, 0x17, 0x14), (0xE9, 0x57, 0x3F), (0x1A, 0x0F, 0x0B)
rgb = lambda c: tuple(v / 255 for v in c)  # noqa: E731

ROWS = ['12', '11', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']


def encode(ch):
    c = ch.upper()
    if c == '/':
        return ['0', '1']
    if c.isdigit():
        return [c]
    if 'A' <= c <= 'I':
        return ['12', str(ord(c) - 64)]
    if 'J' <= c <= 'R':
        return ['11', str(ord(c) - 73)]
    if 'S' <= c <= 'Z':
        return ['0', str(ord(c) - 81)]
    return []


assert encode('K') == ['11', '2'] and encode('S') == ['0', '2'] and encode('A') == ['12', '1']

doc = pymupdf.open()
page = doc.new_page(width=W, height=H)
page.insert_font(fontname='disp', fontfile=str(FONTS / 'Archivo_wdth_wght_118_900.ttf'))
page.insert_font(fontname='lab', fontfile=str(FONTS / 'Archivo_wdth_wght_87_700.ttf'))
page.insert_font(fontname='dot', fontfile=str(FONTS / 'Doto_wght_800.ttf'))
disp = pymupdf.Font(fontfile=str(FONTS / 'Archivo_wdth_wght_118_900.ttf'))

page.draw_rect(page.rect, color=None, fill=rgb(DESK))

# kartu dengan sudut kiri-atas terpotong
x0, y0, x1, y1, cut = 40, 40, W - 40, H - 40, 36
page.draw_polyline([(x0 + cut, y0), (x1, y0), (x1, y1), (x0, y1), (x0, y0 + cut), (x0 + cut, y0)],
                   color=None, fill=rgb(STOCK), closePath=True)

# stub kanan + perforasi
stub_x = 880
page.draw_rect(pymupdf.Rect(stub_x, y0, x1, y1), color=None,
               fill=tuple(min(1, v + 0.05) for v in rgb(STOCK)))
page.draw_line((stub_x, y0), (stub_x, y1), color=rgb(INK), width=2, dashes='[6 5] 0', stroke_opacity=0.5)

# pita grid Hollerith
text = 'KEVIN FEBRIAN BIMANTARA / SOFTWARE ENGINEER'
cols, gx0, gx1, gy0 = 60, 64, stub_x - 20, 70
cw = (gx1 - gx0) / cols
rh = 19
chars = text.ljust(cols)[:cols]
for i, ch in enumerate(chars):
    cx = gx0 + i * cw + cw / 2
    if ch.strip():
        page.insert_text((cx - 3.2, gy0 + 10), ch, fontname='dot', fontsize=10, color=rgb(INK))
    holes = encode(ch)
    for r, row in enumerate(ROWS):
        cy = gy0 + 22 + r * rh
        if row in holes:
            page.draw_rect(pymupdf.Rect(cx - cw * 0.3, cy - 1, cx + cw * 0.3, cy + 12), color=None, fill=rgb(DESK))
        elif len(row) == 1:
            page.insert_text((cx - 2, cy + 8), row, fontname='lab', fontsize=7.5, color=rgb(INK),
                             fill_opacity=0.38, stroke_opacity=0.38)

# nama besar
name_y = gy0 + 22 + 12 * rh + 50
for k, line in enumerate(['KEVIN FEBRIAN', 'BIMANTARA']):
    page.insert_text((64, name_y + k * 54), line, fontname='disp', fontsize=52, color=rgb(INK))

# strip headline
hl = 'SOFTWARE ENGINEER / FULLSTACK DEVELOPER'
hy = name_y + 54 + 26
page.draw_rect(pymupdf.Rect(62, hy, 62 + 17 + len(hl) * 12.2, hy + 36), color=None, fill=rgb(INK))
page.insert_text((72, hy + 25), hl, fontname='dot', fontsize=19, color=rgb(STOCK))

# foto + domain di stub
photo = ROOT / 'public/assets/portfolio/profile/1.png'
pr = pymupdf.Rect(stub_x + 50, y0 + 56, stub_x + 50 + 180, y0 + 56 + 180)
if photo.exists():
    page.draw_rect(pr, color=None, fill=rgb(INK))
    page.insert_image(pr, filename=str(photo), keep_proportion=True)
    page.draw_rect(pr, color=rgb(INK), width=3)
page.insert_text((stub_x + 50, pr.y1 + 46), 'PORTFOLIO', fontname='lab', fontsize=22, color=rgb(INK))
page.insert_text((stub_x + 50, pr.y1 + 74), 'Web & Mobile', fontname='lab', fontsize=16, color=rgb(INK))
page.insert_text((stub_x + 50, y1 - 66), 'PORTOFOLIO.', fontname='dot', fontsize=15, color=rgb(INK))
page.insert_text((stub_x + 50, y1 - 46), 'KEVINHUB.SPACE', fontname='dot', fontsize=15, color=rgb(INK))

# strip tick 80 kolom di tepi bawah + nomor urut
for i in range(81):
    tx = x0 + 24 + i * (x1 - x0 - 48) / 80
    page.draw_line((tx, y1 - 22), (tx, y1 - 15), color=rgb(INK), width=1, stroke_opacity=0.35)
page.insert_text((x1 - 120, y1 - 30), 'KFB 0001', fontname='dot', fontsize=11, color=rgb(INK))

out = ROOT / 'public/og-image.png'
page.get_pixmap(dpi=72, alpha=False).save(str(out))
print('wrote', out, out.stat().st_size, 'bytes')
