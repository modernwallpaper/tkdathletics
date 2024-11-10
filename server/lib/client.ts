export function getClientIP(req: Request): string | null {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  console.log(req.headers);

  if (xForwardedFor) {
    // Use the first IP in the list if there are multiple proxies
    return xForwardedFor.split(",")[0].trim();
  }
  
  return "";
}
