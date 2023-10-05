export const expires20Minute: number = 60 * 20;
export const accessToken: string = "accessToken";
export const refreshToken: string = "refreshToken";

interface IPropsSetCookie {
    [name: string]: string | number | Date
}

export function getCookie(name: string): string | undefined {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props: IPropsSetCookie = {}): void {
    let exp: string | number | Date = props.expires;
    if (typeof exp === 'number' && exp) {
        const d: Date = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp instanceof Date && exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        updatedCookie += '=' + props[propName];
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
    setCookie(name, "", { expires: -1 });
}