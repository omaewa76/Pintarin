export function getRiskBgColor(score) {
  if (score >= 80) {
    return "bg-red-100";
  }

  if (score >= 60) {
    return "bg-yellow-100";
  }

  return "bg-emerald-100";
}

export function getRiskTextColor(score) {
  if (score >= 80) {
    return "text-red-700";
  }

  if (score >= 60) {
    return "text-yellow-700";
  }

  return "text-emerald-700";
}

export function getRiskLabel(score) {
  if (score >= 80) {
    return "Tinggi";
  }

  if (score >= 60) {
    return "Sedang";
  }

  return "Rendah";
}

export function getRiskDotColor(score) {
  if (score >= 80) {
    return "#EF4444";
  }

  if (score >= 60) {
    return "#F59E0B";
  }

  return "#10B981";
}
