require('dotenv').config();
// Import modul discord.js-selfbot-v13
const { Client } = require('discord.js-selfbot-v13');

// Membuat client bot
const client = new Client();

// Variabel untuk interval
let interval = null;

// ID channel tempat pesan akan dikirimkan
const CHANNEL_ID = '1142113741140410418';

// Fungsi untuk mengirim kumpulan pesan
const sendMessages = async (channel) => {
    try {
        await channel.send('$kl 12000');
        console.log('Pesan $kl 12000 pertama dikirim.');

        // Menunggu 1 detik sebelum mengirim pesan berikutnya
        setTimeout(async () => {
            await channel.send('$kl 12000');
            console.log('Pesan $kl 12000 kedua dikirim.');

            await channel.send('y');
            console.log('Pesan y dikirim.');

            await channel.send('$arlp');
            console.log('Pesan $arlp pertama dikirim.');

            // Menunggu 1 detik sebelum mengirim $arlp kedua
            setTimeout(async () => {
                await channel.send('$arlp');
                console.log('Pesan $arlp kedua dikirim.');
            }, 1000); // 1000 ms = 1 detik
        }, 1000); // 1000 ms = 1 detik
    } catch (error) {
        console.error('Gagal mengirim pesan:', error);
    }
};

// Event saat bot berhasil login
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Event saat menerima pesan
client.on('messageCreate', async (message) => {
    // Pastikan hanya memproses pesan dari pengguna sendiri
    if (message.author.id !== client.user.id) return;

    if (message.content === '$mulaigeming') {
        // Mendapatkan channel berdasarkan ID
        const channel = await client.channels.fetch(CHANNEL_ID).catch((error) => {
            console.error('Gagal mendapatkan channel:', error);
            return null;
        });

        if (!channel) {
            console.error('Channel tidak ditemukan.');
            return;
        }

        // Mulai interval untuk mengirim pesan setiap 70 detik
        if (!interval) {
            await sendMessages(channel);
            interval = setInterval(() => sendMessages(channel), 70000);
            console.log('Pengiriman pesan dimulai.');
        }
    } else if (message.content === '$stopgeming') {
        // Hentikan interval jika berjalan
        if (interval) {
            clearInterval(interval);
            interval = null;
            console.log('Pengiriman pesan dihentikan.');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
