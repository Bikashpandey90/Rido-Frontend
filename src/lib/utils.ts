import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  //name=value;expires=value;path=value;
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname: string) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function datify(date: Date) {
  const year = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  return year

}
export function timefy(date: Date) {
  const time = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true })
  return time
}

export function shortify(address: string, len: number = 2) {
  const Address = address.split(',').slice(0, len).join(' ')
  return Address
}
export function initialify(name: string) {
  return name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()

}

export function capitalify(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}