// Builds the force–displacement plot used on the home page.
//
// The loops come from a Bouc–Wen hysteretic model of a damper driven
// through three displacement cycles of increasing amplitude (10, 20, 30 mm),
// the way a damper is characterised on a servo-hydraulic test machine.
// Everything is computed once at build time and written out as plain SVG.

const UY = 3; // yield displacement, mm
const K = 10; // initial stiffness, kN/mm
const ALPHA = 0.08; // post-yield stiffness ratio
const A = 1;
const BETA = 0.6;
const GAMMA = 0.4;
const N = 2;

// Plot frame (SVG user units) and data ranges.
export const frame = { w: 560, h: 432, left: 22, right: 538, top: 36, bottom: 396 };
const X_RANGE = 35; // ± mm
const Y_RANGE = 60; // ± kN

export const sx = (u: number) =>
  frame.left + ((u + X_RANGE) / (2 * X_RANGE)) * (frame.right - frame.left);
export const sy = (f: number) =>
  frame.bottom - ((f + Y_RANGE) / (2 * Y_RANGE)) * (frame.bottom - frame.top);

function simulate(amplitudes: number[]) {
  const steps = 720; // per cycle
  let z = 0;
  let uPrev = 0;
  const loops: Array<Array<[number, number]>> = [];
  for (const X of amplitudes) {
    // Two cycles at each amplitude; keep the second (stabilised) one.
    const pts: Array<[number, number]> = [];
    for (let i = 1; i <= 2 * steps; i++) {
      const u = X * Math.sin((2 * Math.PI * i) / steps);
      const du = u - uPrev;
      // Sub-step for accuracy at the reversal points.
      const sub = 8;
      for (let s = 0; s < sub; s++) {
        const d = du / sub;
        const dz = (A - Math.pow(Math.abs(z), N) * (BETA + GAMMA * Math.sign(d * z))) * (d / UY);
        z += dz;
      }
      uPrev = u;
      if (i > steps) {
        const f = ALPHA * K * u + (1 - ALPHA) * K * UY * z;
        pts.push([u, f]);
      }
    }
    loops.push(pts);
  }
  return loops;
}

function toPath(pts: Array<[number, number]>, every = 4) {
  let d = '';
  pts.forEach(([u, f], i) => {
    if (i % every !== 0 && i !== pts.length - 1) return;
    d += (d ? 'L' : 'M') + sx(u).toFixed(1) + ' ' + sy(f).toFixed(1);
  });
  return d + 'Z';
}

export function buildPlot() {
  const amplitudes = [10, 20, 30];
  const loops = simulate(amplitudes).map((pts) => toPath(pts));

  const minor: string[] = [];
  const major: string[] = [];
  for (let u = -X_RANGE + 1; u < X_RANGE; u += 2) {
    const x = sx(u).toFixed(1);
    minor.push(`M${x} ${frame.top}V${frame.bottom}`); // every 2 mm
  }
  for (let u = -30; u <= 30; u += 10) {
    const x = sx(u).toFixed(1);
    major.push(`M${x} ${frame.top}V${frame.bottom}`);
  }
  for (let f = -Y_RANGE + 5; f < Y_RANGE; f += 5) {
    const y = sy(f).toFixed(1);
    (f % 20 === 0 ? major : minor).push(`M${frame.left} ${y}H${frame.right}`);
  }

  const xTicks = [-30, -20, -10, 10, 20, 30].map((u) => ({ v: u, x: sx(u), y: sy(0) }));
  const yTicks = [-40, -20, 20, 40].map((f) => ({ v: f, x: sx(0), y: sy(f) }));

  return {
    frame,
    loops,
    gridMinor: minor.join(''),
    gridMajor: major.join(''),
    xAxis: `M${frame.left} ${sy(0).toFixed(1)}H${frame.right}`,
    yAxis: `M${sx(0).toFixed(1)} ${frame.top}V${frame.bottom}`,
    xTicks,
    yTicks,
    // Where the "energy" note sits (top-left, clear of the loops) and points:
    // inside the outer loop only.
    note: { x: sx(-33.5), y: sy(52), startY: sy(37), tipX: sx(-21), tipY: sy(3) },
    origin: { x: sx(0), y: sy(0) },
  };
}
