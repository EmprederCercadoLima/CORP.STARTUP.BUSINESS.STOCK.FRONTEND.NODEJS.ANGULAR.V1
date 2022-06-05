
import { Injectable } from '@angular/core'
import * as CryptoJs from 'crypto-js'

@Injectable()
export class CryptoUtil {
  static encryptData = (encryptText: string, hash: string, key: string) => {
    return CryptoJs.AES.encrypt(encryptText, CryptoJs.enc.Utf8.parse(hash), {
      iv: CryptoJs.enc.Utf8.parse(key),
    }).toString()
  }

  static decryptData = (cryptText: string, hash: string, key: string) => {
    var cipherParams = CryptoJs.lib.CipherParams.create({
      ciphertext: CryptoJs.enc.Base64.parse(cryptText),
    })
    var decryptedFromText = CryptoJs.AES.decrypt(cipherParams, CryptoJs.enc.Utf8.parse(hash), { iv: CryptoJs.enc.Utf8.parse(key) })
    return decryptedFromText.toString(CryptoJs.enc.Utf8)
  }
}
