export const BOT_OWNER = '𝐅ᴀᴍᴏᴜꜱ 𝐇ᴏɴᴇʏ';
export const BOT_POWERED_BY = 'ᴅʀ ʜᴏɴᴇʏ ᴛᴇᴄʜx';
export const BOT_COMMAND_GROUPS = [
  { category: 'DOWNLOADERS', commands: ['.pinterest / .pin','.apk','.drama','.fb / .facebook','.gdrive','.igdl / .ig2','.igstory','.insta / .ig','.mf','.snapchat / .snap','.spotify','.video','.ytmp3 / .ytaudio','.ytmp4 / .yt'] },
  { category: 'MEDIA / CONVERTER', commands: ['.qc / .quote','.readmore','.song / .play','.s / .sticker','.take','.toaudio / .tomp3','.toimg / .simg','.tovideo / .smp4'] },
  { category: 'AI / CHATBOT', commands: ['.caption','.gpt','.imagine / .txt2img'] },
  { category: 'FUN / GAMES', commands: ['.aura','.character','.choose','.dare','.8ball','.emojimix / .emix','.fancy','.hack','.horoscope / .zodiac','.joke','.lyrics / .lyric','.meme','.roast','.ship','.truth'] },
  { category: 'GROUP / GROUP-ADMIN', commands: ['.demote / .dismiss','.gclink','.goodbye','.groupinfo / .ginfo','.hidetag','.promote / .admin','.welcome'] },
  { category: 'TOOLS / UTILITY', commands: ['.ai','.anticall','.autoreacts','.autotyping','.bmi','.botinfo','.clearcache','.dp','.gcstatus / .gcs','.getpp / .getdp','.ghost','.id','.link','.menu2','.mode','.ocr','.presence','.qr / .qrcode','.rebrandly / .rbly','.remini / .hd','.repeat','.save / .grab','.speedtest / .speed','.status','.support','.translate / .tr','.tts / .say','.ttstalk','.uptime','.url','.vv','.vv2','.watermark / .wm','.weather'] },
  { category: 'ADMIN / MODERATION', commands: ['.accept','.add','.antilink','.antistatus','.kick / .remove','.kickoffline','.tagal','.tagall'] },
  { category: 'GENERAL / BASIC', commands: ['.alive','.owner','.pair','.ping','.runtime'] },
  { category: 'OWNER / BOT-CONTROL', commands: ['.antidelete','.antiedit','.autocreact / .acr','.broadcast','.chf','.chfire','.chreact / .chreacts','.chvote','.deploy','.jgroup','.logs','.restart','.serverinfo','.session','.setname'] },
] as const;

export const BOT_FEATURES = BOT_COMMAND_GROUPS.map((group) => group.category);
export const BOT_COMMAND_COUNT = BOT_COMMAND_GROUPS.reduce((total, group) => total + group.commands.length, 0);
