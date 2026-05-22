export function formatRupiah(number) {
  if (!number && number !== 0) {
    return "Rp 0";
  }

  if (number >= 1000000000) {
    return `Rp ${(number / 1000000000).toFixed(1).replace(".", ",")} M`;
  }

  if (number >= 1000000) {
    return `Rp ${(number / 1000000).toFixed(0).replace(".", ",")} JT`;
  }

  return `Rp ${formatCount(number)}`;
}

export function formatCount(number) {
  if (!number && number !== 0) {
    return "0";
  }

  return Number(number).toLocaleString("id-ID");
}
