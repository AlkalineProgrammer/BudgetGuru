export default class Util {
  static statusColor(status: string) {
    if (status === 'pending') {
      return 'orange'
    } else if (status === 'approved') {
      return 'green'
    } else if (status === 'rejected') {
      return 'red'
    }
  }

  static verifyMobile(d: string) {
    const m = /^(0|[1-9][0-9]*)$/
    return m.test(d)
  }

  static verifyAlpahbet(d: string) {
    const m = /^(?!\s)(?![\s\S]*\s$)[a-zA-Z ]*$/;
    return m.test(d)
  }
  static async hash(string: string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  static alphaNumeric(d: string) {
    const m = /^[ A-Za-z0-9_@./#&+-]*$/
    // /^[a-z\d\-_\s]+$/i
    return m.test(d)
  }

  static verifyEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  static verifyName(name: string) {
    // console.log(name)
    const re = /^[a-zA-Z ]*$/
    //const re = /[a-zA-Z][a-zA-Z ]/;
    //const re = /[a-zA-Z]/;
    return re.test(name)
  }

  static verifyAmount(amount: string) {
    const re = /^\d+(\.\d{0,2})?$/;
    return re.test(amount);
  }

  static verifyNumber(num: string) {
    const re = /^[0-9\b]+$/
    //const re = /^\d+$/g;
    return re.test(num)
  }

  static verifyPassword(pwd: string) {
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[@#$%^*!])(?=\S+$).{8,20}$/
    return re.test(pwd)
  }


  static randomColor() {
    return (
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
  }
}