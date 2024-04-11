export const rules = {
  require: [(v: any) => !!v || "กรุณากรอกข้อมูลให้ครบถ้วน"],
  title: [
    [(v: any) => v.split().length > 100 || "จำเป็นต้องมีมากกว่า 100 ตัวอักษร"],
  ],
  description:[],
  name: [(v: any) => !!v || "กรุณากรอกชื่อ"],
  fullName: [(v: any) => !!v || "กรุณากรอกชื่อ-นามสกุล"],
  username: [(v: any) => !!v || "กรุณากรอกชื่อผู้ใช้"],
  email: [
    (v: any) => !!v || "กรุณากรอกอีเมล",
    (v: any) => /.+@.+\..+/.test(v) || "รูปแบบอีเมลไม่ถูกต้อง",
    (v: any) => v.split(" ").length <= 1 || "ไม่อนุญาติเว้นวรรค",
  ],
  password: [
    (v: any) => !!v || "กรุณากรอกรหัสผ่าน",
    (v: any) => v.length >= 6 || "รหัสผ่านต้องขั้นต่ำ 6 ตัวอักษร",
  ],
  confirmPassword: [(v: any) => !!v || "กรุณากรอกยืนยันรหัสผ่าน"],
  account: [(v: any) => !!v || "กรุณากรอกชื่อบัญชี"],
  role: [(v: any) => !!v || "กรุณาเลือกสิทธิ์การใช้งาน"],
  fileName: [(v: any) => !!v || "กรุณากรอกชื่อไฟล์งาน"],
  phone: [(v: any) => !!v || "กรุณากรอกเบอร์โทร"],
  address: [(v: any) => !!v || "กรุณากรอกที่อยู่"],
};