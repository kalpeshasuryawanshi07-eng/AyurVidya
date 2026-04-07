const User = require('../../models/User');
const { connect, disconnect } = require('./db');

const DEFAULT_ADMIN = {
  name: process.env.DEFAULT_ADMIN_NAME || 'AyurVidya Admin',
  email: (process.env.DEFAULT_ADMIN_EMAIL || 'admin@ayurvidya.local').toLowerCase(),
  password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123456',
  preferredLang: process.env.DEFAULT_ADMIN_LANG || 'en'
};

async function seedAdmin() {
  await connect();
  try {
    let admin = await User.findOne({ email: DEFAULT_ADMIN.email });

    if (!admin) {
      admin = new User({
        name: DEFAULT_ADMIN.name,
        email: DEFAULT_ADMIN.email,
        password: DEFAULT_ADMIN.password,
        role: 'admin',
        preferredLang: DEFAULT_ADMIN.preferredLang
      });
      await admin.save();
      console.log(`[seed] Created default admin user: ${DEFAULT_ADMIN.email}`);
      return;
    }

    admin.name = DEFAULT_ADMIN.name;
    admin.role = 'admin';
    admin.preferredLang = DEFAULT_ADMIN.preferredLang;

    if (process.env.RESET_DEFAULT_ADMIN_PASSWORD === 'true') {
      admin.password = DEFAULT_ADMIN.password;
    }

    await admin.save();
    console.log(`[seed] Ensured admin role for user: ${DEFAULT_ADMIN.email}`);
  } finally {
    await disconnect();
  }
}

if (require.main === module) {
  seedAdmin()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('[seed] Failed to seed admin user:', error);
      process.exit(1);
    });
}

module.exports = {
  seedAdmin,
  DEFAULT_ADMIN
};
