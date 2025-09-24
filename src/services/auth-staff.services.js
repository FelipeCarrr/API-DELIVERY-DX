import { Rol } from "../models/rol.model.js";
import { StaffCredential } from "../models/staff-credentials.models.js";
import { Staff } from "../models/staff.model.js";
import bcrypt from "bcrypt";

export class AuthStaffService {
  static async createAuthStaffDefault() {
    const rolid = await Rol.findOne({
      where: {
        name: "ADMIN",
      },
    });

    try {
      const admin = await Staff.findOrCreate({
        where: {
          name: "admin",
        },
        defaults: {
          name: "admin",
          lastName: "admin",
          phone: "11111111",
          RolId: rolid.id,
          email: "admin@admin.com",
        },
      });

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash("admin", salt);

      await StaffCredential.findOrCreate({
        where: {
          StaffId: admin[0].id,
        },
        defaults: {
          StaffId: admin[0].id,
          password: password,
        },
      });
    } catch (error) {
      console.log(error);
    }

    //##PACKER##
    const packerid = await Rol.findOne({
      where: {
        name: "PACKER",
      },
    });

    try {
      const packer = await Staff.findOrCreate({
        where: {
          name: "Jean",
        },
        defaults: {
          name: "Jean",
          lastName: "Packer",
          phone: "3158645321",
          RolId: packerid.id,
          email: "1@1.com",
        },
      });

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash("1234", salt);

      await StaffCredential.findOrCreate({
        where: {
          StaffId: packer[0].id,
        },
        defaults: {
          StaffId: packer[0].id,
          password: password,
        },
      });
    } catch (error) {
      console.log(error);
    }

    //##COURIER##
    const courierid = await Rol.findOne({
      where: {
        name: "COURIER",
      },
    });

    try {
      const courier = await Staff.findOrCreate({
        where: {
          name: "Carlos",
        },
        defaults: {
          name: "Carlos",
          lastName: "Delivery",
          phone: "3100000000",
          RolId: courierid.id,
          email: "courier@delivery.com",
        },
      });

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash("1234", salt);

      await StaffCredential.findOrCreate({
        where: {
          StaffId: courier[0].id,
        },
        defaults: {
          StaffId: courier[0].id,
          password: password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async createAuthStaff(data) {
    console.log(data);

    const rol = await Rol.findOne({
      where: {
        name: data.rol,
      },
    });

    const staff = await Staff.create({
      ...data,
      RolId: rol.id,
    });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data.phone, salt);

    await StaffCredential.findOrCreate({
      where: {
        StaffId: staff.id,
      },
      defaults: {
        StaffId: staff.id,
        password: password,
      },
    });

    return staff;
  }

  static async loginStaff(user) {
    const findEmail = await Staff.findOne({
      where: {
        email: user.email,
      },
      include: {
        model: Rol,
      },
    });

    if (findEmail && findEmail.id) {
      const findPassword = await StaffCredential.findOne({
        where: {
          StaffId: findEmail.id,
        },
      });
      const validatePassword = await bcrypt.compare(
        user.password,
        findPassword.password
      );
      if (validatePassword) {
        return findEmail;
      }
    }

    return false;
  }
}
