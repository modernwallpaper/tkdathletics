// Get the current OS
export function getOS() {
  let userAgent = window.navigator.userAgent;
  let platform = window.navigator.platform;
  let os: string = "Unknown OS";

  if (/Windows NT 11.0/.test(userAgent)) os = "Windows10";
  else if (/Windows NT 10.0/.test(userAgent)) os = "Windows10";
  else if (/Windows NT 6.2/.test(userAgent)) os = "Windows8";
  else if (/Windows NT 6.1/.test(userAgent)) os = "Windows7";
  else if (/Windows NT 6.0/.test(userAgent)) os = "WindowsVista";
  else if (/Windows NT 5.1/.test(userAgent)) os = "WindowsXP";
  else if (/Mac OS X/.test(userAgent)) os = "macOS";
  else if (/Linux/.test(platform)) os = "Linux";
  else if (/iPhone/.test(userAgent)) os = "iOS";
  else if (/iPad/.test(userAgent)) os = "iOS";
  else if (/Android/.test(userAgent)) os = "Android";

  return os;
}
