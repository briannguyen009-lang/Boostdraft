/**
 * Lunar — a front-end-only music prototype for a lunar colony.
 * Default export: App. Requires React, Tailwind CSS, and lucide-react.
 * All screens, styling, mock data, and behavior are contained in this file.
 * State is intentionally ephemeral. No backend, browser storage, or real audio.
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Baby,
  BatteryFull,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Compass,
  Disc3,
  Earth as EarthIcon,
  Globe2,
  Headphones,
  Heart,
  Home,
  Languages,
  Leaf,
  LockKeyhole,
  MessageCircle,
  Mic,
  Moon,
  MoreHorizontal,
  Music2,
  Pause,
  Play,
  Plus,
  Radio,
  Repeat2,
  Rocket,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Shuffle,
  Signal,
  SkipBack,
  SkipForward,
  Sparkles,
  Sprout,
  Square,
  Star,
  Sunrise,
  Upload,
  UserRound,
  Users,
  Volume2,
  VolumeX,
  Wifi,
  X,
} from 'lucide-react';

// All content is fictional. Every interaction stays in React memory.
const COLONISTS = [
  {
    id: 'kenji',
    name: 'Kenji Nakamura Oliveira',
    short: 'Kenji',
    role: 'Habitat Engineer',
    habitat: 'Tranquility Module B',
    heritages: ['Japanese', 'Brazilian'],
    languages: ['Portuguese', 'Japanese'],
    color: '#b99178',
    bio: 'Building a home among the stars. Learning to be Ayla’s dad.',
    genres: ['Bossa Nova', 'City Pop'],
    connections: 47,
  },
  {
    id: 'elif',
    name: 'Elif Demir',
    short: 'Elif',
    role: 'Botanist',
    habitat: 'Tranquility Module B',
    heritages: ['Turkish'],
    languages: ['Turkish', 'English'],
    color: '#d7a17f',
    bio: 'Growing little green things. Mum to our littlest Moonese, Ayla.',
    genres: ['Turkish Folk', 'Anatolian Rock'],
    connections: 62,
  },
  {
    id: 'amara',
    name: 'Amara Okonkwo',
    short: 'Amara',
    role: 'Flight Surgeon',
    habitat: 'Unity Module A',
    heritages: ['Nigerian', 'British'],
    languages: ['Igbo', 'English'],
    color: '#916b53',
    bio: 'A good rhythm is its own kind of medicine.',
    genres: ['Afrobeats', 'Jazz'],
    connections: 39,
  },
  {
    id: 'arjun',
    name: 'Arjun Mehta',
    short: 'Arjun',
    role: 'Systems Engineer',
    habitat: 'Horizon Module C',
    heritages: ['Indian'],
    languages: ['Hindi', 'Gujarati', 'English'],
    color: '#b18063',
    bio: 'Fixing air filters, missing monsoon mornings.',
    genres: ['Bollywood', 'Classical'],
    connections: 34,
  },
  {
    id: 'lucia',
    name: 'Lucía Hernández',
    short: 'Lucía',
    role: 'Geologist',
    habitat: 'Unity Module A',
    heritages: ['Mexican'],
    languages: ['Spanish', 'English'],
    color: '#c79575',
    bio: 'Collecting rocks and songs that feel like Sunday lunch.',
    genres: ['Cumbia', 'Electronic'],
    connections: 51,
  },
  {
    id: 'jiwoo',
    name: 'Park Ji-woo',
    short: 'Ji-woo',
    role: 'Robotics Specialist',
    habitat: 'Horizon Module C',
    heritages: ['Korean'],
    languages: ['Korean', 'English'],
    color: '#dfb695',
    bio: 'Teaching robots to dance. Results are mixed.',
    genres: ['K-Pop', 'Electronic'],
    connections: 28,
  },
  {
    id: 'lena',
    name: 'Lena Weber',
    short: 'Lena',
    role: 'Architect',
    habitat: 'Tranquility Module A',
    heritages: ['German', 'Turkish'],
    languages: ['German', 'Turkish', 'English'],
    color: '#ddb49b',
    bio: 'Designing spaces that feel less far away.',
    genres: ['Classical', 'Anatolian Rock'],
    connections: 31,
  },
  {
    id: 'imani',
    name: 'Imani Wanjiku',
    short: 'Imani',
    role: 'Greenhouse Technician',
    habitat: 'Unity Module B',
    heritages: ['Kenyan'],
    languages: ['Swahili', 'Kikuyu', 'English'],
    color: '#96684d',
    bio: 'Keeper of tomatoes, collector of good basslines.',
    genres: ['Afrobeats', 'Jazz'],
    connections: 44,
  },
  {
    id: 'maya',
    name: 'Maya Chen-Laurent',
    short: 'Maya',
    role: 'Communications Officer',
    habitat: 'Horizon Module A',
    heritages: ['Chinese', 'Canadian'],
    languages: ['French', 'Mandarin', 'English'],
    color: '#ce9e80',
    bio: 'Sending our stories home, one sync at a time.',
    genres: ['Jazz', 'Hip-Hop'],
    connections: 55,
  },
  {
    id: 'omar',
    name: 'Omar El-Sayed',
    short: 'Omar',
    role: 'Water Systems Engineer',
    habitat: 'Tranquility Module C',
    heritages: ['Egyptian'],
    languages: ['Arabic', 'English'],
    color: '#bb8968',
    bio: 'The oud came in my carry-on. Worth every gram.',
    genres: ['Arabic Folk', 'Jazz'],
    connections: 36,
  },
  {
    id: 'sari',
    name: 'Sari Pratama',
    short: 'Sari',
    role: 'Materials Scientist',
    habitat: 'Unity Module C',
    heritages: ['Indonesian', 'Dutch'],
    languages: ['Indonesian', 'Dutch', 'English'],
    color: '#bc896b',
    bio: 'Finding new resonances in unfamiliar materials.',
    genres: ['Gamelan', 'Electronic'],
    connections: 26,
  },
  {
    id: 'mateo',
    name: 'Mateo Rojas',
    short: 'Mateo',
    role: 'Astronomer',
    habitat: 'Horizon Module B',
    heritages: ['Chilean'],
    languages: ['Spanish', 'English'],
    color: '#bd957b',
    bio: 'The same stars, from a different window.',
    genres: ['Andean Folk', 'Cumbia'],
    connections: 41,
  },
  {
    id: 'noor',
    name: 'Noor Haddad',
    short: 'Noor',
    role: 'Colony Cook',
    habitat: 'Unity Module A',
    heritages: ['Lebanese', 'French'],
    languages: ['Arabic', 'French', 'English'],
    color: '#d4a086',
    bio: 'Come for the bread. Stay for the kitchen playlist.',
    genres: ['Arabic Folk', 'Hip-Hop'],
    connections: 73,
  },
];
const TRACK_DATA = [
  [
    'Windows of São Paulo',
    'Maré de Dentro',
    'Bossa Nova',
    'Portuguese',
    'kenji',
    'Minha avó cantava isso na cozinha, com as janelas abertas. Agora canto para Ayla, olhando a Terra.',
    'My grandmother sang this in the kitchen, with the windows open. Now I sing it to Ayla while looking at Earth.',
    224,
    'earth',
  ],
  [
    'The Apricot Tree',
    'Deniz & the Garden',
    'Turkish Folk',
    'Turkish',
    'elif',
    'Annem bu melodiyi bahçede söylerdi. Ayla bir gün ağaçların altında uyusun diye.',
    'My mother used to sing this melody in the garden. I hope Ayla will sleep beneath real trees one day.',
    198,
    'earth',
  ],
  [
    'Saturday in Surulere',
    'Nkem & the Satellites',
    'Afrobeats',
    'English',
    'amara',
    'My brother and I made up a dance to this in our tiny living room. I still do it before a difficult shift.',
    null,
    246,
    'earth',
  ],
  [
    'Monsoon on Platform Nine',
    'Ravi Sundar Ensemble',
    'Bollywood',
    'Hindi',
    'arjun',
    'The first rain always smelled like warm stone. This song is the closest I can get to that smell up here.',
    null,
    263,
    'earth',
  ],
  [
    'Patio de mi Abuela',
    'Las Luciérnagas',
    'Cumbia',
    'Spanish',
    'lucia',
    'Los domingos no terminaban hasta que mi abuela bailaba. Esta canción siempre era la última.',
    'Sundays never ended until my grandmother danced. This song was always the last one.',
    211,
    'earth',
  ],
  [
    'Blue Hour, Seoul',
    'Nari & Co.',
    'City Pop',
    'Korean',
    'jiwoo',
    'For the bus ride home after late lab sessions, when the whole city seemed to breathe a little slower.',
    null,
    231,
    'earth',
  ],
  [
    'Room for the Sun',
    'Ada Morgen',
    'Classical',
    'Instrumental',
    'lena',
    'My father played this on a piano missing two keys. I still hear the little gaps in the melody.',
    null,
    276,
    'earth',
  ],
  [
    'Under the Jacaranda',
    'Wema Collective',
    'Afrobeats',
    'Swahili',
    'imani',
    'We used to wait for the purple blossoms before the school holidays. This is the sound of that waiting.',
    null,
    207,
    'earth',
  ],
  [
    'Deux rives',
    'Éloïse Lin',
    'Jazz',
    'French',
    'maya',
    'À Montréal, cette chanson reliait les deux langues de notre maison. Ici, elle relie deux mondes.',
    'In Montréal, this song joined the two languages of our home. Here, it joins two worlds.',
    249,
    'earth',
  ],
  [
    'Nile at Dusk',
    'Youssef El Nour',
    'Arabic Folk',
    'Arabic',
    'omar',
    'My uncle taught me these oud patterns on a rooftop in Cairo. The habitat ceiling will have to do for now.',
    null,
    235,
    'earth',
  ],
  [
    'Rain on the Tin Roof',
    'Awan Senja',
    'Gamelan',
    'Indonesian',
    'sari',
    'The interlocking rhythms remind me that no one has to carry the whole melody alone. A useful thought on the Moon.',
    null,
    281,
    'earth',
  ],
  [
    'Cordillera, softly',
    'Tomás del Valle',
    'Andean Folk',
    'Spanish',
    'mateo',
    'I grew up with mountains at every window. These lunar ridges look nothing like the Andes, but this helps.',
    null,
    219,
    'earth',
  ],
  [
    'Bread Before Sunrise',
    'Les Voisins',
    'Hip-Hop',
    'French',
    'noor',
    'My cousins would argue over who got the first warm loaf. This was always playing underneath the argument.',
    null,
    202,
    'earth',
  ],
  [
    'Little Moon, Sleep',
    'Hana no Oto',
    'Enka',
    'Japanese',
    'kenji',
    'A lullaby for Ayla, from the Japanese side of our family. I am learning the verses my grandfather never got to teach me.',
    null,
    183,
    'cradle',
  ],
  [
    'Nana, pequena estrela',
    'Lia do Mar',
    'Brazilian Lullaby',
    'Portuguese',
    'kenji',
    'For our little star. Your great-grandmother is singing along from São Paulo, even if you cannot hear her yet.',
    null,
    196,
    'cradle',
  ],
  [
    'Uyu, Ay Işığı',
    'Selin Yıldız',
    'Turkish Lullaby',
    'Turkish',
    'elif',
    'Uyu küçük ay ışığım. Bu yeni dünyada seni seven çok insan var.',
    'Sleep, my little moonlight. There are so many people who love you in this new world.',
    204,
    'cradle',
  ],
  [
    'Oxygen Garden',
    'Imani & the Greenhouse Choir',
    'Ambient',
    'Swahili',
    'imani',
    'We recorded this among the first tomato vines. You can hear the irrigation pump keeping time.',
    null,
    252,
    'moon',
  ],
  [
    'One Sixth',
    'J.W. Park',
    'Electronic',
    'Instrumental',
    'jiwoo',
    'An experiment in rhythms that feel like low gravity. Made with the sounds of our maintenance robots.',
    null,
    228,
    'moon',
  ],
  [
    'Habitat B, 02:00',
    'Kenji N.O.',
    'Bossa Nova',
    'Portuguese',
    'kenji',
    'A quiet guitar sketch after everyone fell asleep. This room is slowly becoming home.',
    null,
    178,
    'moon',
  ],
  [
    'The Air Between Us',
    'Sari P.',
    'Experimental',
    'Instrumental',
    'sari',
    'We tapped different alloys from the workshop and found a scale. Even the walls have a song.',
    null,
    245,
    'moon',
  ],
  [
    'Earthlight Waltz',
    'Lena & Omar',
    'Classical',
    'Instrumental',
    'lena',
    'An oud and a little keyboard, recorded in the common room. Our first attempt at making a shared tradition.',
    null,
    264,
    'moon',
  ],
  [
    'Signal / Home',
    'Amara O.',
    'Spoken Word',
    'English',
    'amara',
    'A poem for the messages that arrive a little late. Love still gets here.',
    null,
    169,
    'moon',
  ],
  [
    'Dance Beneath the Antenna',
    'Sol de Medianoche',
    'Cumbia',
    'Spanish',
    'lucia',
    'My sister says everyone back home is dancing to this. Saving a spot on the common-room floor for you.',
    null,
    216,
    'earth',
    true,
  ],
  [
    'Second Spring',
    'Yuna Circuit',
    'K-Pop',
    'Korean',
    'jiwoo',
    'A new release from a band I followed at university. Some things are worth the wait for the next sync.',
    null,
    209,
    'earth',
    true,
  ],
  [
    'After the Rain, Lagos',
    'The Orange Line',
    'Afrobeats',
    'English',
    'amara',
    'My brother sent this in his last message. We promised to listen together once it reaches the Moon.',
    null,
    238,
    'earth',
    true,
  ],
  [
    'Saffron Radio',
    'Asha & the Monsoons',
    'Indian Folk',
    'Hindi',
    'arjun',
    'This reminds me of my mother tuning the kitchen radio while cooking. A tiny, ordinary miracle.',
    null,
    251,
    'earth',
  ],
  [
    'Anatolian Stars',
    'Kaya Electric',
    'Anatolian Rock',
    'Turkish',
    'lena',
    'My two sides of the family agreed on almost nothing musical. Then we put this record on.',
    null,
    243,
    'earth',
  ],
  [
    'Northern Windows',
    'Cedar Static',
    'Indie Folk',
    'English',
    'maya',
    'Snow against the window, a mug held in both hands. I brought this small winter with me.',
    null,
    217,
    'earth',
  ],
  [
    'Between Two Skies',
    'Mateo Rojas',
    'Andean Folk',
    'Spanish',
    'mateo',
    'Recorded after our first Earthrise walk. The silence here makes every note feel like a choice.',
    null,
    193,
    'moon',
  ],
  [
    'Common Ground',
    'The Habitat Sessions',
    'Jazz',
    'Instrumental',
    'noor',
    'Five of us stayed after dinner and passed a melody around. This is what happened when nobody tried to lead.',
    null,
    292,
    'moon',
  ],
];
const SONGS = TRACK_DATA.map((t, i) => ({
  id: 'song-' + i,
  title: t[0],
  artist: t[1],
  genre: t[2],
  language: t[3],
  contributor: t[4],
  note: t[5],
  translation: t[6],
  duration: t[7],
  source: t[8],
  pending: !!t[9],
  art: i,
}));
const HERITAGES = [
  'Brazilian',
  'Japanese',
  'Turkish',
  'Nigerian',
  'Indian',
  'Mexican',
  'Korean',
  'German',
  'Kenyan',
  'Canadian',
  'Egyptian',
  'Indonesian',
  'Chilean',
  'Filipino',
  'Chinese',
  'Lebanese',
  'French',
  'British',
  'Dutch',
  'Other / self-describe',
];
const GENRES = [
  'Bossa Nova',
  'Samba',
  'Enka',
  'City Pop',
  'Turkish Folk',
  'Anatolian Rock',
  'Afrobeats',
  'K-Pop',
  'Cumbia',
  'Bollywood',
  'Classical',
  'Jazz',
  'Electronic',
  'Hip-Hop',
  'Gamelan',
  'Andean Folk',
];
const LANGUAGES = [
  'English',
  'Portuguese',
  'Japanese',
  'Turkish',
  'Spanish',
  'Korean',
  'Hindi',
  'Arabic',
  'French',
  'Swahili',
  'Indonesian',
  'German',
  'Mandarin',
  'Tagalog',
];
const ROOMS = [
  {
    id: 'greenhouse',
    name: 'Greenhouse Grooves',
    count: 12,
    host: 'imani',
    song: 16,
    description: 'A little rhythm for things that grow.',
    color: '#91b99a',
    icon: Sprout,
    people: ['imani', 'amara', 'sari'],
  },
  {
    id: 'lullabies',
    name: 'Longnight Lullabies',
    count: 5,
    host: 'elif',
    song: 15,
    description: 'Soft songs. Quiet company.',
    color: '#b0a1ce',
    icon: Moon,
    people: ['elif', 'kenji', 'lena'],
  },
];
const PALETTES = [
  ['#afc4b4', '#3e796e', '#d0b97f'],
  ['#e7ba88', '#9a6349', '#425950'],
  ['#b78851', '#593e27', '#d7ba88'],
  ['#8898a9', '#314054', '#b4c0d0'],
  ['#d0a778', '#764344', '#d5be91'],
  ['#adb0be', '#595770', '#c1aab5'],
  ['#d2cbbc', '#737b6e', '#f2ddbd'],
  ['#a6b384', '#476350', '#e7c88a'],
];
const personById = (id) => COLONISTS.find((p) => p.id === id);
const time = (n) => Math.floor(n / 60) + ':' + String(Math.floor(n % 60)).padStart(2, '0');
const matches = (s, q) =>
  [s.title, s.artist, s.genre, s.language, ...(personById(s.contributor)?.heritages || [])]
    .join(' ')
    .toLocaleLowerCase()
    .includes(q.toLocaleLowerCase());
const cx = (...c) => c.filter(Boolean).join(' ');

function Avatar({ person, size = 36, className = '' }) {
  const p = typeof person === 'string' ? personById(person) : person;
  const n = Math.max(
    0,
    COLONISTS.findIndex((a) => a.id === p?.id),
  );
  return (
    <span
      className={cx('avatar', className)}
      style={{ width: size, height: size, background: (p?.color || '#91a9bf') + '33' }}
      title={p?.name || 'You'}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="24" fill={p?.color || '#91a9bf'} opacity=".2" />
        <path
          d="M5 49C6 31 40 30 43 49"
          fill={['#60857c', '#a47e72', '#707e9b', '#b3996d'][n % 4]}
        />
        <ellipse cx="24" cy="21" rx="10" ry="13" fill={p?.color || '#c3a089'} />
        <path
          d={
            n % 3 === 0
              ? 'M13 22V15C13 1 37 4 35 19L31 14 25 16 18 13 15 25Z'
              : n % 3 === 1
                ? 'M12 28V17C9 1 39 0 36 23L33 32 32 17 19 11 16 20 16 34Z'
                : 'M13 20C8 5 24 0 30 6 39 6 38 21 34 24L32 15 18 15 15 24Z'
          }
          fill={n % 5 === 1 ? '#594037' : '#27262b'}
        />
        <path d="M20 26Q24 29 28 26" stroke="#503b39" strokeWidth="1.2" fill="none" />
        <circle cx="20" cy="21" r=".85" fill="#302728" />
        <circle cx="28" cy="21" r=".85" fill="#302728" />
      </svg>
    </span>
  );
}
function AvatarStack({ people = ['kenji', 'elif', 'amara'], size = 28 }) {
  return (
    <div className="avatar-stack">
      {people.map((p) => (
        <Avatar key={typeof p === 'string' ? p : p.id} person={p} size={size} />
      ))}
    </div>
  );
}
function Earth({ className = '' }) {
  return (
    <div className={cx('earth', className)} aria-label="Earth rising above the Moon" role="img">
      <div className="earth-land" />
      <div className="earth-clouds" />
      <div className="earth-shadow" />
    </div>
  );
}
function Art({ song, size, className = '' }) {
  const i = song?.art || 0,
    p = PALETTES[i % PALETTES.length];
  return (
    <div
      className={cx('art art-' + (i % 5), className)}
      style={{
        '--art-a': p[0],
        '--art-b': p[1],
        '--art-c': p[2],
        ...(size ? { width: size, height: size } : {}),
      }}
      aria-hidden="true"
    >
      <span className="art-orb" />
      <span className="art-line one" />
      <span className="art-line two" />
      <span className="art-line three" />
      <span className="art-grain" />
      {size > 100 && (
        <span className="art-type">
          {song?.artist}
          <b>{song?.title}</b>
        </span>
      )}
    </div>
  );
}
function Button({ children, className = '', variant = 'primary', ...props }) {
  return (
    <button className={cx('btn', 'btn-' + variant, className)} {...props}>
      {children}
    </button>
  );
}
function IconButton({ icon: Icon, label, className = '', ...props }) {
  return (
    <button className={cx('icon-btn', className)} aria-label={label} title={label} {...props}>
      <Icon size={21} />
    </button>
  );
}
function Chip({ children, selected, onClick, className = '' }) {
  return onClick ? (
    <button
      className={cx('chip', selected && 'selected', className)}
      aria-pressed={!!selected}
      onClick={onClick}
    >
      {selected && <Check size={12} />} {children}
    </button>
  ) : (
    <span className={cx('chip static', className)}>{children}</span>
  );
}
function Field({ label, children, optional }) {
  return (
    <label className="field">
      <span>
        {label}
        {optional && <small>Optional</small>}
      </span>
      {children}
    </label>
  );
}
function SearchBox({
  value,
  onChange,
  placeholder = 'Songs, artists, traditions…',
  autoFocus = false,
}) {
  return (
    <div className="search">
      <Search size={18} />
      <input
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
      />
      {value && (
        <button aria-label="Clear search" onClick={() => onChange('')}>
          <X size={16} />
        </button>
      )}
    </div>
  );
}
function Empty({ title = 'A little quiet here', children }) {
  return (
    <div className="empty">
      <Disc3 size={30} />
      <h3>{title}</h3>
      <p>{children || 'Try another song, artist, or tradition.'}</p>
    </div>
  );
}
function SectionTitle({ children, action, onClick }) {
  return (
    <div className="section-title">
      <h2>{children}</h2>
      {action && (
        <button className="text-action" onClick={onClick}>
          {action}
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
function SongRow({ song, onClick, selected, current, right, subtitle }) {
  return (
    <button
      className={cx('song-row', selected && 'song-selected', current && 'song-current')}
      onClick={onClick}
    >
      <Art song={song} size={46} />
      <span className="song-info">
        <strong>{song.title}</strong>
        <span>{subtitle || song.artist}</span>
        {song.pending && (
          <small className="gold">
            <Clock3 size={10} /> Arriving in the next sync
          </small>
        )}
      </span>
      {right ||
        (selected ? (
          <Check size={18} className="blue" />
        ) : current ? (
          <AudioLines size={18} className="blue" />
        ) : (
          <Play size={16} fill="currentColor" />
        ))}
    </button>
  );
}
function Waveform({ active }) {
  return (
    <div className={cx('waveform', active && 'recording')}>
      {Array.from({ length: 36 }, (_, i) => (
        <i
          key={i}
          style={{
            height: 8 + (Math.sin(i * 2.3) + 1) * 18,
            animationDelay: (i % 8) * -0.13 + 's',
          }}
        />
      ))}
    </div>
  );
}
function Overlay({ children, title, onClose, full = false, className = '' }) {
  const ref = useRef(null),
    closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement;
    const focusables = () => [
      ...(ref.current?.querySelectorAll(
        'button:not(:disabled),input:not(:disabled),textarea,select,[tabindex="0"]',
      ) || []),
    ];
    focusables()[0]?.focus({ preventScroll: true });
    const handle = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeRef.current();
      }
      if (e.key === 'Tab') {
        const els = focusables();
        if (!els.length) return;
        const first = els[0],
          last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handle);
    return () => {
      document.removeEventListener('keydown', handle);
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <div
      className={cx('overlay', full && 'full-overlay')}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        ref={ref}
        className={cx('sheet', full && 'full-sheet', className)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {!full && <div className="sheet-handle" />}
        <div className="sheet-top">
          <span className="eyebrow">{title}</span>
          <IconButton icon={full ? ChevronDown : X} label="Close" onClick={onClose} />
        </div>
        {children}
      </section>
    </div>
  );
}

const CSS = `
* {
  box-sizing: border-box;
}
html,
body,
#root {
  margin: 0;
  min-width: 320px;
  min-height: 100%;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}
body {
  background: #080a0f;
  color: #f3f3f4;
}
button,
input,
select,
textarea {
  font: inherit;
}
button {
  cursor: pointer;
}
button:disabled {
  cursor: default;
  opacity: 0.4;
}
button,
input,
textarea,
select {
  -webkit-tap-highlight-color: transparent;
}
button {
  color: inherit;
  border: 0;
}
button:focus-visible,
a:focus-visible {
  outline: 2px solid #91c0ff;
  outline-offset: 3px;
}
input:focus,
textarea:focus,
select:focus {
  outline: 1px solid #4f9dff;
  border-color: #4f9dff;
}
button {
  transition:
    background 0.18s,
    transform 0.18s,
    opacity 0.18s;
}
button:active:not(:disabled) {
  transform: scale(0.975);
}
button svg {
  flex-shrink: 0;
}
p,
h1,
h2,
h3,
h4 {
  margin: 0;
}
p {
  line-height: 1.65;
}
h1,
h2,
h3,
h4 {
  font-weight: 550;
}
svg {
  vertical-align: middle;
  flex-shrink: 0;
}
input,
textarea,
select {
  width: 100%;
  color: #eceff4;
  background: #151924;
  border: 1px solid #2b303b;
  border-radius: 12px;
  padding: 13px 14px;
  font-size: 14px;
  line-height: 1.5;
}
input::placeholder,
textarea::placeholder {
  color: #778290;
}
textarea {
  resize: vertical;
  min-height: 108px;
}
select {
  appearance: auto;
  color-scheme: dark;
}
small {
  font-size: 11px;
}
a {
  color: inherit;
}
.stage {
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 44px 24px;
  position: relative;
  overflow: hidden;
  background: radial-gradient(ellipse at 50% 39%, #17222d50 0, transparent 52%), #080a0f;
}
.stage:before {
  content: "";
  position: absolute;
  width: 960px;
  height: 960px;
  border-radius: 50%;
  border: 1px solid #8baacb09;
  box-shadow:
    0 0 0 140px #8baacb03,
    0 0 0 280px #8baacb02;
}
.desktop-mark {
  position: absolute;
  left: 5%;
  top: 46px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.desktop-mark > span {
  font-size: 19px;
  letter-spacing: 6px;
  font-weight: 400;
}
.desktop-mark small {
  display: block;
  letter-spacing: 2px;
  font-size: 8px;
  color: #778593;
  margin-top: 6px;
}
.desktop-coordinate {
  position: absolute;
  right: 5%;
  top: 49px;
  font: 10px/1.8 monospace;
  letter-spacing: 1px;
  color: #596775;
  text-align: right;
}
.desktop-caption {
  position: absolute;
  left: 5%;
  bottom: 11%;
  max-width: 230px;
}
.desktop-caption h2 {
  font-size: 25px;
  line-height: 1.35;
  letter-spacing: -0.6px;
  font-weight: 400;
  color: #b4bdc7;
}
.desktop-caption p {
  font-size: 11px;
  line-height: 1.8;
  max-width: 205px;
  color: #626f7c;
  margin-top: 15px;
}
.desktop-caption .tiny-line {
  display: block;
  width: 26px;
  height: 1px;
  background: #a28d59;
  margin-bottom: 22px;
}
.desktop-footer {
  position: absolute;
  right: 5%;
  bottom: 8%;
  writing-mode: vertical-rl;
  font: 9px monospace;
  letter-spacing: 3px;
  color: #596572;
}
.phone {
  width: 406px;
  height: 860px;
  flex-shrink: 0;
  position: relative;
  padding: 7px;
  border-radius: 53px;
  background: linear-gradient(135deg, #5b6068, #22262e 20%, #0f1117 60%, #414752);
  box-shadow:
    0 32px 100px #0009,
    0 0 0 1px #ffffff0b,
    0 2px 1px #9da5b655 inset;
  z-index: 1;
}
.phone:before,
.phone:after {
  content: "";
  position: absolute;
  left: -3px;
  top: 140px;
  width: 3px;
  height: 52px;
  background: #303640;
  border-radius: 3px;
}
.phone:after {
  top: 208px;
  height: 76px;
}
.device {
  height: 844px;
  width: 390px;
  background: #0b0d12;
  border-radius: 46px;
  overflow: hidden;
  position: relative;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  isolation: isolate;
}
.status-bar {
  height: 45px;
  min-height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px 0 30px;
  z-index: 25;
  font-size: 13px;
  font-weight: 600;
  position: relative;
}
.status-icons {
  display: flex;
  align-items: center;
  gap: 5px;
}
.island {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 94px;
  height: 25px;
  border-radius: 25px;
  background: #06070a;
}
.island:after {
  content: "";
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  right: 10px;
  top: 9px;
  background: #132133;
  box-shadow: 0 0 2px #53688c50;
}
.app-body {
  flex: 1;
  min-height: 0;
  position: relative;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
  overflow: auto;
  min-height: 0;
  scrollbar-width: none;
  overscroll-behavior: contain;
  padding: 16px 23px 28px;
}
.scroll-view::-webkit-scrollbar,
.sheet-scroll::-webkit-scrollbar,
.horizontal::-webkit-scrollbar {
  display: none;
}
.screen {
  animation: appear 0.25s ease both;
}
.eyebrow {
  font-size: 10px;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: #a2acba;
  font-weight: 500;
}
.gold {
  color: #e8c87a !important;
}
.blue {
  color: #73b2ff !important;
}
.muted {
  color: #9aa3b2;
}
.faint {
  color: #7e8796;
}
.title {
  font-size: 29px;
  line-height: 1.2;
  letter-spacing: -1px;
  font-weight: 500;
}
.subtitle {
  font-size: 13px;
  color: #9aa3b2;
  line-height: 1.7;
  margin-top: 9px;
}
.btn {
  min-height: 49px;
  padding: 13px 19px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
}
.btn-primary {
  background: #4f9dff;
  color: #081626;
  box-shadow: 0 4px 20px #4f9dff10;
}
.btn-primary:hover {
  background: #72b0ff;
}
.btn-secondary {
  background: #202733;
  border: 1px solid #374251;
  color: #e2e9f2;
}
.btn-secondary:hover {
  background: #2a3443;
}
.btn-ghost {
  background: transparent;
  color: #aab5c3;
}
.btn-gold {
  background: #e8c87a;
  color: #201e16;
}
.btn-outline {
  background: transparent;
  border: 1px solid #39424f;
  color: #d4e0eb;
}
.btn-sm {
  min-height: 36px;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 11px;
}
.full-width {
  width: 100%;
}
.icon-btn {
  width: 44px;
  height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 50%;
  color: #b9c4d2;
}
.icon-btn:hover {
  background: #ffffff09;
}
.text-action {
  font-size: 11px;
  color: #95bce9;
  display: flex;
  gap: 2px;
  align-items: center;
  background: none;
  min-height: 36px;
  padding: 0;
}
.card {
  border: 1px solid #262d38;
  background: #151924;
  border-radius: 16px;
  padding: 18px;
}
.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 1px solid #303641;
  background: #161b24;
  color: #b3bdcb;
  border-radius: 24px;
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.2;
  min-height: 36px;
  white-space: nowrap;
}
.chip.selected {
  color: #a6ccff;
  border-color: #4f9dff80;
  background: #4f9dff17;
}
.chip.static {
  font-size: 10px;
  padding: 5px 8px;
  min-height: 0;
  background: #ffffff04;
  border-color: #ffffff0c;
}
.chips {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
}
.field {
  display: block;
  margin-bottom: 19px;
}
.field > span {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
  color: #c2cad5;
}
.field small {
  font-weight: 400;
  color: #788391;
}
.search {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #151924;
  border: 1px solid #2b303b;
  border-radius: 12px;
  padding: 0 13px;
  color: #939eaf;
  min-height: 47px;
}
.search input {
  border: 0;
  background: transparent;
  padding: 12px 0;
  font-size: 13px;
  outline: none;
  min-width: 0;
}
.search:focus-within {
  border-color: #4f9dff;
}
.search button {
  background: none;
  display: grid;
  place-items: center;
  min-width: 28px;
  height: 32px;
}
.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 25px 0 13px;
  gap: 10px;
}
.section-title h2 {
  font-size: 16px;
  letter-spacing: -0.3px;
}
.avatar {
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  vertical-align: middle;
  border: 1px solid #ffffff12;
}
.avatar svg {
  width: 100%;
  height: 100%;
}
.avatar-stack {
  display: flex;
  align-items: center;
  padding-left: 0;
}
.avatar-stack .avatar {
  border: 2px solid #151924;
  margin-left: -8px;
}
.avatar-stack .avatar:first-child {
  margin-left: 0;
}
.person-row {
  display: flex;
  gap: 12px;
  align-items: center;
}
.person-row > div {
  flex: 1;
  min-width: 0;
}
.person-row strong {
  display: block;
  font-size: 13px;
  font-weight: 550;
}
.person-row p {
  font-size: 11px;
  color: #9aa3b2;
}
.toggle {
  height: 23px;
  width: 41px;
  min-width: 41px;
  padding: 3px;
  border-radius: 20px;
  background: #3d4754;
  transition: 0.2s;
}
.toggle:after {
  content: "";
  display: block;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: #fff;
  transition: 0.2s;
}
.toggle.on {
  background: #4f9dff;
}
.toggle.on:after {
  transform: translateX(18px);
}
.row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.small-copy {
  font-size: 12px;
  color: #9aa3b2;
  line-height: 1.7;
}
.divider {
  height: 1px;
  background: #ffffff0a;
  margin: 21px 0;
}
.earth {
  width: 190px;
  aspect-ratio: 1;
  border-radius: 50%;
  position: relative;
  background:
    radial-gradient(ellipse at 29% 20%, #cff0edb0, transparent 18%),
    radial-gradient(ellipse at 20% 35%, #759b8d 0 7%, transparent 19%),
    radial-gradient(ellipse at 55% 20%, #a4bea5 0 6%, transparent 16%),
    radial-gradient(ellipse at 30% 68%, #8a9d6d 0 7%, transparent 17%),
    radial-gradient(ellipse at 43% 51%, #57928e 0 8%, transparent 20%),
    radial-gradient(circle at 35% 32%, #4681a2, #2b6088 38%, #163d63 62%, #071b33 80%);
  box-shadow:
    0 0 28px #71b9ed27,
    -6px 0 45px #4f9dff20,
    inset 2px 1px 4px #b1e7ff90;
  transform: rotate(-18deg);
}
.earth-land {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  overflow: hidden;
  opacity: 0.7;
  filter: blur(0.5px);
}
.earth-land:before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #bdc2a2, #649084 55%, #38716c);
  clip-path: polygon(
    33% 8%,
    44% 10%,
    50% 15%,
    47% 22%,
    58% 24%,
    62% 32%,
    54% 36%,
    51% 43%,
    56% 51%,
    48% 58%,
    48% 67%,
    42% 76%,
    36% 72%,
    33% 61%,
    28% 52%,
    29% 44%,
    24% 38%,
    21% 30%,
    26% 24%,
    23% 19%
  );
}
.earth-land:after {
  content: "";
  position: absolute;
  inset: 0;
  background: #87a594;
  clip-path: polygon(
    65% 9%,
    82% 20%,
    90% 34%,
    78% 31%,
    74% 36%,
    68% 33%,
    61% 38%,
    58% 30%,
    64% 26%,
    59% 20%
  );
}
.earth-clouds {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  opacity: 0.62;
  background:
    radial-gradient(ellipse at 29% 15%, #eff7f2aa, transparent 22%),
    radial-gradient(ellipse at 44% 32%, transparent 20%, #eaf0e559 22%, transparent 27%),
    radial-gradient(ellipse at 50% 75%, transparent 29%, #f4f3ea70 31%, transparent 38%),
    radial-gradient(ellipse at 13% 40%, #f4f3ea66, transparent 22%);
  filter: blur(1.2px);
}
.earth-shadow {
  position: absolute;
  inset: -1px;
  border-radius: 50%;
  background: radial-gradient(circle at 12% 30%, transparent 16%, #01080c24 38%, #01050bef 78%);
}
.welcome {
  position: relative;
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  text-align: center;
  background: radial-gradient(ellipse at 30% 35%, #1c375044, transparent 58%);
}
.welcome:before,
.star-field:before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 14% 17%, #cfdeeb80 0 0.7px, transparent 1px),
    radial-gradient(circle at 82% 25%, #cfdeeb80 0 0.7px, transparent 1px),
    radial-gradient(circle at 20% 60%, #cfdeeb70 0 0.7px, transparent 1px),
    radial-gradient(circle at 60% 9%, #cfdeeb70 0 0.7px, transparent 1px),
    radial-gradient(circle at 76% 47%, #cfdeeb55 0 0.7px, transparent 1px);
  background-size:
    177px 213px,
    260px 260px,
    250px 290px,
    390px 200px,
    290px 190px;
}
.welcome-brand {
  position: relative;
  margin-top: 24px;
  font-size: 21px;
  letter-spacing: 7px;
  font-weight: 400;
}
.welcome-brand svg {
  color: #dfcfac;
  margin-right: 6px;
}
.welcome-brand small {
  display: block;
  font-size: 8px;
  color: #7c8998;
  letter-spacing: 2.6px;
  margin-top: 10px;
}
.earthrise-scene {
  height: 287px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}
.earthrise-scene .earth {
  position: absolute;
  left: 99px;
  top: 57px;
}
.orbit {
  position: absolute;
  left: 41px;
  top: 17px;
  width: 306px;
  height: 306px;
  border: 1px solid #97b8d414;
  border-radius: 50%;
  transform: rotate(-30deg);
}
.orbit:before {
  content: "";
  position: absolute;
  left: 53px;
  top: 36px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #d4c594;
  box-shadow: 0 0 12px #e8c87a70;
}
.orbit:nth-child(2) {
  left: 10px;
  top: -14px;
  width: 368px;
  height: 368px;
  border-style: dashed;
  opacity: 0.4;
}
.lunar-horizon {
  position: absolute;
  left: -70px;
  right: -70px;
  top: 240px;
  height: 250px;
  border-radius: 50% 50% 0 0;
  background:
    radial-gradient(ellipse at 26% 1%, #5c697266, transparent 18%),
    linear-gradient(180deg, #353c45 0, #181d25 12%, #0b0d12 45%);
  border-top: 1px solid #8697a25a;
  box-shadow: 0 -6px 30px #a5cbe812;
  transform: rotate(-6deg);
}
.horizon-lines {
  position: absolute;
  inset: 0;
  opacity: 0.22;
  background: repeating-radial-gradient(
    ellipse at 65% 100%,
    transparent 0 11px,
    #b1b8c12b 12px,
    transparent 13px 28px
  );
}
.welcome-copy {
  position: relative;
  margin-top: 10px;
  padding: 0 28px;
}
.welcome-copy .eyebrow {
  font-size: 9px;
  letter-spacing: 2.2px;
  color: #d6bd85;
}
.welcome-copy h1 {
  font-size: 41px;
  line-height: 1.13;
  font-weight: 400;
  letter-spacing: -1.7px;
  margin: 18px 0 15px;
}
.welcome-copy p {
  font-size: 13px;
  line-height: 1.7;
  color: #9aa3b2;
}
.welcome-bottom {
  margin-top: auto;
  padding: 24px 25px 23px;
}
.welcome-bottom .btn {
  height: 52px;
  font-size: 14px;
}
.welcome-bottom > p {
  font-size: 9px;
  letter-spacing: 2px;
  color: #7a8493;
  margin-top: 18px;
}
.step-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 17px 0 0;
}
.step-dots i {
  width: 5px;
  height: 5px;
  background: #3b414e;
  border-radius: 10px;
}
.step-dots i.active {
  width: 21px;
  background: #72b3ff;
}
.home-indicator {
  height: 5px;
  min-height: 5px;
  width: 114px;
  background: #e6e8ed;
  margin: 0 auto 8px;
  border-radius: 10px;
  opacity: 0.8;
}
.onboard {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.onboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 18px 13px;
}
.step-bars {
  display: flex;
  gap: 4px;
  flex: 1;
  margin: 0 25px 0 13px;
}
.step-bars i {
  height: 3px;
  flex: 1;
  background: #2e3540;
  border-radius: 6px;
}
.step-bars i.active {
  background: #80baff;
}
.onboard-header > span {
  font-size: 10px;
  color: #9aa3b2;
}
.onboard-content {
  overflow: auto;
  scrollbar-width: none;
  flex: 1;
  min-height: 0;
  padding: 13px 24px 20px;
}
.onboard-content .title {
  font-size: 30px;
  margin-top: 10px;
}
.onboard-content > .subtitle {
  margin-bottom: 24px;
}
.onboard-footer {
  padding: 14px 24px 17px;
  border-top: 1px solid #ffffff07;
  background: #0b0d12;
}
.photo-pick {
  display: flex;
  gap: 16px;
  align-items: center;
  margin: 26px 0;
}
.photo-pick button {
  position: relative;
  background: none;
  padding: 0;
}
.photo-plus {
  position: absolute;
  right: -3px;
  bottom: 0;
  background: #4f9dff;
  color: #071426;
  border: 3px solid #0b0d12;
  border-radius: 50%;
  padding: 3px;
}
.photo-pick p {
  font-size: 11px;
  color: #939faf;
  margin-top: 4px;
}
.selection-section {
  margin: 19px 0;
}
.selection-section h3 {
  font-size: 12px;
  color: #bcc6d5;
  margin-bottom: 11px;
}
.visibility-row {
  display: flex;
  align-items: center;
  gap: 13px;
  background: #151924;
  padding: 14px;
  border-radius: 12px;
  margin-top: 20px;
}
.visibility-row > div {
  flex: 1;
}
.visibility-row strong {
  font-size: 12px;
  font-weight: 500;
}
.visibility-row p {
  font-size: 10px;
  color: #919dad;
  line-height: 1.6;
  margin-top: 3px;
}
.song-row {
  background: none;
  width: 100%;
  padding: 10px 0;
  display: flex;
  text-align: left;
  align-items: center;
  gap: 12px;
  min-height: 66px;
  border-bottom: 1px solid #ffffff07;
}
.song-row > svg {
  color: #8b98a7;
  margin-left: auto;
}
.song-info {
  flex: 1;
  min-width: 0;
}
.song-info strong {
  display: block;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.35;
}
.song-info > span {
  display: block;
  font-size: 11px;
  color: #9aa3b2;
  margin-top: 5px;
}
.song-info small {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  margin-top: 5px;
}
.song-selected {
  background: #4f9dff0d;
  margin: 0 -8px;
  width: calc(100% + 16px);
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 10px;
}
.song-current strong {
  color: #8ac0ff;
}
.art {
  border-radius: 9px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(150deg, var(--art-a), var(--art-b));
  isolation: isolate;
}
.art-orb {
  position: absolute;
  left: 15%;
  top: 12%;
  width: 78%;
  height: 78%;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 25%, var(--art-c), var(--art-b) 70%);
  box-shadow: 0 12px 24px #0002;
}
.art-line {
  position: absolute;
  left: -20%;
  top: 50%;
  width: 140%;
  height: 60%;
  border: 1px solid #faf4d855;
  border-radius: 50%;
  transform: rotate(-28deg);
}
.art-line.two {
  top: 56%;
}
.art-line.three {
  top: 62%;
}
.art-1 .art-orb {
  border-radius: 70% 70% 0 0;
  width: 60%;
  height: 83%;
  left: 20%;
  top: 23%;
  background: linear-gradient(150deg, var(--art-c), var(--art-b));
}
.art-1 .art-line {
  transform: rotate(30deg);
  border-width: 8px;
  border-color: #ffffff13;
}
.art-2 {
  background: repeating-linear-gradient(80deg, var(--art-b) 0 4%, var(--art-a) 4% 11%);
}
.art-2 .art-orb {
  left: 24%;
  top: 25%;
  width: 52%;
  height: 52%;
  box-shadow: 0 0 0 9px #0002;
  background: var(--art-c);
}
.art-3 .art-orb {
  left: 30%;
  top: 30%;
  background: radial-gradient(
    circle at 50% 50%,
    var(--art-a),
    var(--art-b) 6% 17%,
    var(--art-a) 18% 19%,
    var(--art-b) 20% 32%,
    var(--art-a) 33% 34%,
    var(--art-b) 35%
  );
  box-shadow: 0 0 0 1px #fff2;
}
.art-4 .art-orb {
  left: 8%;
  width: 55%;
  height: 110%;
  border-radius: 50% 50% 0 0;
  transform: rotate(35deg);
  background: linear-gradient(60deg, var(--art-c), var(--art-b));
}
.art-grain {
  position: absolute;
  inset: 0;
  opacity: 0.12;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%23fff' filter='url(%23n)' opacity='.6' d='M0 0h160v160H0z'/%3E%3C/svg%3E");
}
.art-type {
  position: absolute;
  top: 12%;
  left: 10%;
  right: 10%;
  font-size: 8px;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fff;
  mix-blend-mode: screen;
}
.art-type b {
  display: block;
  font-weight: 400;
  font-size: 22px;
  letter-spacing: -0.6px;
  text-transform: none;
  margin-top: 5px;
  max-width: 180px;
}
.welcome-note {
  display: flex;
  gap: 10px;
  color: #9aa3b2;
  font-size: 11px;
  line-height: 1.6;
  margin: 17px 0;
}
.welcome-note svg {
  color: #d3bb80;
}
.connection-card {
  padding: 16px;
  margin-bottom: 11px;
}
.connection-card .chips {
  margin-top: 12px;
}
.match-reason {
  font-size: 11px;
  margin-top: 11px;
  color: #a8bac7;
}
.room-card {
  border: 1px solid #2a3437;
  border-radius: 15px;
  background: linear-gradient(135deg, #1d302b, #141b21);
  padding: 16px;
}
.room-card.purple {
  background: linear-gradient(135deg, #282638, #171921);
  border-color: #383247;
}
.room-icon {
  width: 36px;
  height: 36px;
  background: #ffffff09;
  display: grid;
  place-items: center;
  border-radius: 11px;
  color: #a3c9ac;
}
.room-card h3 {
  font-size: 13px;
}
.room-card p {
  font-size: 10px;
  color: #a0ada8;
  margin-top: 4px;
}
.room-card .row-between:last-child {
  margin-top: 18px;
}
.live-dot {
  width: 5px;
  height: 5px;
  background: #92cdb1;
  display: inline-block;
  border-radius: 50%;
  margin-right: 5px;
  box-shadow: 0 0 7px #83bf9e33;
}
.home-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3px 0 17px;
}
.home-top .eyebrow {
  font-size: 9px;
  letter-spacing: 1.5px;
}
.home-top h1 {
  font-weight: 450;
  font-size: 27px;
  letter-spacing: -0.8px;
  margin-top: 8px;
}
.home-top button {
  background: none;
  padding: 0;
}
.phase {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: #b9a87d;
  margin-top: 8px;
}
.colony-strip {
  display: flex;
  background: #151a23;
  border: 1px solid #252b35;
  padding: 13px 0;
  border-radius: 13px;
  margin-bottom: 22px;
}
.colony-strip > button {
  flex: 1;
  text-align: center;
  background: none;
  border-right: 1px solid #303541;
  padding: 0 5px;
  min-width: 0;
}
.colony-strip > button:last-child {
  border: 0;
}
.colony-strip strong {
  display: block;
  font-size: 13px;
  line-height: 1.3;
  font-weight: 500;
}
.colony-strip span {
  font-size: 8px;
  color: #919ba9;
  display: block;
  margin-top: 5px;
  letter-spacing: 0.5px;
}
.weekly-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 21px;
  border-radius: 17px;
  border: 1px solid #58759248;
  background: linear-gradient(120deg, #1e344a, #172432 60%, #141e2a);
}
.weekly-hero:after {
  content: "";
  position: absolute;
  width: 170px;
  height: 170px;
  border: 1px solid #86b6df19;
  border-radius: 50%;
  right: -50px;
  top: -42px;
  box-shadow:
    0 0 0 26px #86b6df06,
    0 0 0 52px #86b6df05;
  z-index: -1;
}
.weekly-hero .eyebrow {
  font-size: 8px;
  color: #94b9de;
}
.weekly-hero h2 {
  font-size: 25px;
  line-height: 1.2;
  letter-spacing: -0.7px;
  margin: 12px 0 9px;
  font-weight: 450;
  max-width: 220px;
}
.weekly-hero > p {
  font-size: 11px;
  color: #b1c0cd;
  max-width: 215px;
  line-height: 1.7;
}
.weekly-hero .row-between {
  margin-top: 19px;
}
.weekly-hero .btn {
  min-height: 37px;
  font-size: 11px;
  border-radius: 10px;
  padding: 9px 13px;
}
.room-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.room-list .room-card {
  padding: 14px 12px;
}
.room-list .room-card h3 {
  font-size: 12px;
  line-height: 1.5;
  max-width: 120px;
  margin-top: 12px;
}
.room-list .room-card .row-between {
  gap: 4px;
}
.room-list .btn {
  min-height: 30px;
  padding: 6px 11px;
  font-size: 10px;
  border-radius: 8px;
}
.room-list .avatar-stack .avatar {
  width: 23px !important;
  height: 23px !important;
}
.activity-card {
  display: flex;
  gap: 11px;
  border-bottom: 1px solid #242b34;
  padding: 0 0 19px;
  margin-bottom: 20px;
}
.activity-card .activity-copy {
  flex: 1;
  min-width: 0;
  font-size: 11px;
  line-height: 1.6;
  color: #b3bdc9;
}
.activity-copy strong {
  color: #e5e8ed;
  font-weight: 500;
}
.activity-copy blockquote {
  margin: 9px 0 0;
  padding: 0 0 0 10px;
  border-left: 2px solid #a6b5bf4d;
  font-size: 12px;
  line-height: 1.6;
  color: #d0d8e0;
}
.activity-copy > button {
  background: none;
  text-align: left;
  padding: 0;
  width: 100%;
}
.activity-copy small {
  color: #7a8695;
  font-size: 9px;
}
.space-card {
  width: 100%;
  background: linear-gradient(110deg, #171d27, #11161e);
  border: 1px solid #313946;
  padding: 17px;
  border-radius: 15px;
  display: flex;
  gap: 13px;
  align-items: center;
  text-align: left;
}
.space-card > .space-icon {
  width: 43px;
  height: 43px;
  border-radius: 50%;
  border: 1px solid #8294a745;
  display: grid;
  place-items: center;
  color: #b6c7d7;
  background: radial-gradient(circle, #54799925, transparent);
}
.space-card strong {
  font-size: 13px;
  font-weight: 500;
  display: block;
}
.space-card p {
  font-size: 10px;
  color: #9aa3b2;
  margin-top: 3px;
}
.space-card > svg {
  margin-left: auto;
  color: #8ea2b6;
}
.ayla-card {
  margin-top: 16px;
  padding: 18px;
  border-radius: 15px;
  background: linear-gradient(125deg, #302c22, #1d2025);
  border: 1px solid #bfa36b30;
  position: relative;
  overflow: hidden;
}
.ayla-card > svg {
  position: absolute;
  right: 17px;
  top: 17px;
  color: #d0b889;
}
.ayla-card .eyebrow {
  font-size: 8px;
  color: #e8c87a;
}
.ayla-card h3 {
  font-size: 19px;
  letter-spacing: -0.4px;
  margin-top: 10px;
}
.ayla-card p {
  font-size: 11px;
  color: #bcb5a6;
  margin-top: 8px;
  max-width: 255px;
}
.tab-bar {
  height: 72px;
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #0f1219;
  border-top: 1px solid #272d36;
  padding: 3px 8px 9px;
}
.tab-bar button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  background: none;
  color: #818b9b;
  font-size: 9px;
  width: 67px;
  height: 55px;
  position: relative;
}
.tab-bar button.active {
  color: #83baff;
}
.tab-bar button.active:before {
  content: "";
  position: absolute;
  top: -5px;
  width: 19px;
  height: 2px;
  background: #72b1ff;
  border-radius: 3px;
  box-shadow: 0 0 10px #4f9dff77;
}
.tab-bar .active svg {
  fill: #4f9dff15;
}
.bottom-area {
  background: #0f1219;
  position: relative;
  z-index: 5;
}
.mini-player {
  background: linear-gradient(90deg, #233442, #1b2733);
  border: 1px solid #435668;
  display: flex;
  align-items: center;
  position: relative;
  padding: 8px 11px 10px;
  margin: 0 10px 9px;
  border-radius: 12px;
  gap: 11px;
  overflow: hidden;
}
.mini-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  background: none;
  padding: 0;
  text-align: left;
  min-width: 0;
}
.mini-info > span {
  min-width: 0;
}
.mini-info strong {
  font-size: 11px;
  font-weight: 550;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
.mini-info small {
  font-size: 9px;
  color: #aebbc8;
  display: block;
  margin-top: 4px;
}
.mini-player .icon-btn {
  width: 38px;
  min-width: 38px;
  height: 44px;
}
.mini-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: #79baff;
  transition: width 1s linear;
}
.page-top {
  padding: 6px 0 19px;
}
.page-top h1 {
  font-size: 28px;
  letter-spacing: -0.9px;
  margin-top: 9px;
  font-weight: 450;
}
.page-top .row-between > .icon-btn {
  align-self: flex-start;
}
.weekly-cover {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  min-height: 190px;
  padding: 23px;
  border-radius: 17px;
  background: linear-gradient(130deg, #526879, #2a424e 45%, #283035);
  border: 1px solid #ffffff14;
  margin-bottom: 17px;
}
.weekly-cover:before {
  content: "";
  position: absolute;
  right: -45px;
  top: -40px;
  width: 230px;
  height: 230px;
  border-radius: 50%;
  background: repeating-radial-gradient(
    circle at 50% 50%,
    transparent 0 8px,
    #e3e5cd2b 9px,
    transparent 10px 24px
  );
  z-index: -1;
  transform: rotate(-30deg);
}
.weekly-cover .eyebrow {
  font-size: 9px;
  color: #e2d8be;
}
.weekly-cover h2 {
  font-size: 29px;
  line-height: 1.14;
  letter-spacing: -1px;
  font-weight: 400;
  max-width: 220px;
  margin-top: 20px;
}
.weekly-cover > p {
  font-size: 10px;
  color: #c4d0d4;
  margin-top: 13px;
}
.weekly-meta {
  display: flex;
  gap: 15px;
  font-size: 10px;
  color: #9aa3b2;
  margin: 16px 0;
}
.weekly-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}
.weekly-actions {
  display: flex;
  gap: 9px;
  margin-bottom: 8px;
}
.weekly-actions .btn:first-child {
  flex: 1;
}
.weekly-actions .btn {
  min-height: 44px;
  font-size: 12px;
}
.track-card {
  padding: 17px 0;
  border-bottom: 1px solid #262b35;
}
.track-top {
  display: flex;
  align-items: center;
  gap: 12px;
}
.track-top > .track-open {
  flex: 1;
  min-width: 0;
  text-align: left;
  background: none;
  padding: 0;
}
.track-open strong {
  display: block;
  font-size: 13px;
  font-weight: 550;
  line-height: 1.4;
}
.track-open > span {
  font-size: 11px;
  color: #9aa3b2;
  display: block;
  margin-top: 4px;
}
.track-top .icon-btn {
  width: 44px;
  height: 44px;
  min-width: 44px;
}
.track-by {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 10px;
  color: #a8b4c2;
  margin: 12px 0 8px;
}
.track-by button {
  background: none;
  padding: 0;
  color: #c9d4df;
  min-height: 28px;
}
.track-by .chips {
  gap: 4px;
  margin-left: auto;
}
.track-note {
  font-size: 12px;
  color: #aab5c4;
  line-height: 1.65;
  background: none;
  padding: 0;
  text-align: left;
  display: block;
  width: 100%;
}
.track-note.preview {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.note-expanded {
  padding: 13px;
  background: #141a24;
  border-radius: 12px;
  margin-top: 11px;
  animation: appear 0.2s ease;
}
.note-expanded p {
  font-size: 12px;
  line-height: 1.8;
  color: #c6d0dc;
}
.reactions {
  display: flex;
  gap: 6px;
  margin: 13px 0;
}
.reactions button {
  font-size: 9px;
  min-height: 34px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: 1px solid #323c4a;
  border-radius: 20px;
  color: #a9b7c7;
  background: none;
  flex: 1;
}
.reactions button.selected {
  background: #4f9dff1a;
  border-color: #639ada;
  color: #a4cdff;
}
.reply-box {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}
.reply-box input {
  font-size: 11px;
  padding: 10px 11px;
}
.reply-box .icon-btn {
  background: #2a4059;
  border-radius: 10px;
  width: 38px;
  height: 38px;
  min-width: 38px;
}
.reply {
  font-size: 11px !important;
  padding: 10px;
  border-left: 2px solid #65829c;
  background: #ffffff03;
  margin-top: 9px;
}
.horizontal {
  display: flex;
  gap: 11px;
  overflow: auto;
  scrollbar-width: none;
  overscroll-behavior: contain;
}
.album-card {
  flex: 0 0 145px;
  text-align: left;
  background: none;
  padding: 0;
}
.album-card > .art {
  width: 145px;
  height: 145px;
  border-radius: 13px;
}
.album-card strong {
  display: block;
  font-size: 12px;
  font-weight: 500;
  margin-top: 10px;
  line-height: 1.5;
}
.album-card > span {
  font-size: 10px;
  display: block;
  color: #929dad;
  margin-top: 4px;
}
.album-card > small {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  margin-top: 6px;
  color: #c4b27f;
}
.explore-tabs {
  display: flex;
  gap: 7px;
  margin: 17px 0 12px;
}
.explore-tabs button {
  background: none;
  color: #9ca8b7;
  font-size: 12px;
  padding: 7px 0;
  margin-right: 15px;
  border-bottom: 2px solid transparent;
}
.explore-tabs .active {
  color: #e5edf5;
  border-color: #77b4ff;
}
.browse-chips {
  margin-bottom: 7px;
  flex-wrap: nowrap;
  overflow: auto;
  scrollbar-width: none;
}
.browse-chips .chip {
  font-size: 10px;
  min-height: 33px;
}
.upload-banner {
  display: flex;
  align-items: center;
  gap: 13px;
  background: #182334;
  border: 1px solid #31445c;
  padding: 17px;
  border-radius: 14px;
  text-align: left;
  width: 100%;
  margin-top: 25px;
}
.upload-banner strong {
  font-size: 12px;
  font-weight: 550;
  display: block;
}
.upload-banner p {
  font-size: 10px;
  color: #9faec0;
  margin-top: 4px;
}
.upload-banner > svg:last-child {
  margin-left: auto;
}
.timeline {
  position: relative;
  margin: 22px 0 0 8px;
  padding-left: 23px;
  border-left: 1px solid #313944;
}
.timeline-item {
  position: relative;
  padding-bottom: 27px;
}
.timeline-item:before {
  content: "";
  position: absolute;
  left: -29px;
  top: 3px;
  width: 11px;
  height: 11px;
  border: 3px solid #0b0d12;
  background: #839ab1;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #4e6174;
}
.timeline-item.milestone:before {
  background: #e8c87a;
  box-shadow: 0 0 0 1px #c1a46d77;
}
.timeline-item > time {
  font-size: 9px;
  color: #8f9cab;
  letter-spacing: 1px;
}
.timeline-item h3 {
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.35px;
  margin: 9px 0 5px;
  line-height: 1.4;
}
.timeline-item > p {
  font-size: 10px;
  color: #9aa3b2;
}
.timeline-playlist {
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  background: #161c26;
  border: 1px solid #2a3440;
  border-radius: 12px;
  padding: 11px;
  margin-top: 12px;
  text-align: left;
}
.timeline-playlist strong {
  display: block;
  font-size: 11px;
  font-weight: 500;
}
.timeline-playlist small {
  font-size: 9px;
  color: #9aa3b2;
  display: block;
  margin-top: 5px;
}
.timeline-playlist > svg:last-child {
  margin-left: auto;
  color: #93a6b8;
}
.timeline-image {
  height: 105px;
  overflow: hidden;
  border-radius: 12px;
  background: radial-gradient(ellipse at 30% 10%, #243d58, #10151d 75%);
  margin-top: 12px;
  position: relative;
}
.timeline-image .earth {
  width: 75px;
  position: absolute;
  right: 37px;
  top: 17px;
}
.timeline-image span {
  position: absolute;
  left: 16px;
  bottom: 17px;
  font-size: 10px;
  color: #c7cdd4;
  line-height: 1.8;
}
.capsule {
  background: linear-gradient(120deg, #2a291f, #191d23);
  border: 1px solid #e8c87a33;
  border-radius: 16px;
  padding: 20px;
  margin: 4px 0 22px;
  text-align: center;
}
.capsule > svg {
  color: #e8c87a;
  margin: 7px 0 16px;
}
.capsule h3 {
  font-size: 19px;
  font-weight: 450;
  margin: 8px 0;
}
.capsule p {
  font-size: 11px;
  color: #b4aea0;
}
.capsule .btn {
  margin-top: 19px;
  font-size: 11px;
  min-height: 41px;
}
.profile-header {
  text-align: center;
  padding: 14px 0 20px;
}
.profile-header h1 {
  font-size: 27px;
  font-weight: 450;
  margin-top: 14px;
  letter-spacing: -0.7px;
}
.profile-header > p {
  font-size: 12px;
  color: #bcc6d3;
  margin-top: 7px;
}
.profile-header > small {
  font-size: 10px;
  color: #8e9aaa;
  display: block;
  margin: 7px 0 13px;
}
.profile-header .chips {
  justify-content: center;
}
.profile-languages {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 10px;
  color: #91a2b6;
  margin: 12px 0;
}
.profile-header .btn {
  margin-top: 9px;
}
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: #2a303a;
  border: 1px solid #2a303a;
  border-radius: 14px;
  overflow: hidden;
  margin: 0 0 23px;
}
.stats-grid > div {
  padding: 16px;
  background: #151a23;
  text-align: center;
}
.stats-grid b {
  display: block;
  font-size: 22px;
  font-weight: 450;
  color: #b6d6fb;
}
.stats-grid span {
  font-size: 9px;
  color: #9aa3b2;
  display: block;
  margin-top: 6px;
}
.carry-card {
  background: #1a232d;
  border: 1px solid #3d4b584d;
  border-radius: 15px;
  padding: 17px;
}
.carry-card > .eyebrow {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 8px;
  color: #d5bf8f;
}
.carry-card blockquote {
  font-size: 12px;
  line-height: 1.8;
  color: #b6c2cf;
  margin: 12px 0 1px;
}
.profile-footer {
  text-align: center;
  margin-top: 28px;
  color: #737f8f;
  font-size: 9px;
  line-height: 1.8;
}
.profile-footer button {
  display: block;
  color: #9aa9bd;
  text-decoration: underline;
  font-size: 10px;
  background: none;
  margin: 15px auto 0;
  min-height: 36px;
}
.overlay {
  position: absolute;
  inset: 0;
  background: #03060bd1;
  backdrop-filter: blur(8px);
  z-index: 40;
  display: flex;
  align-items: flex-end;
  animation: appear 0.2s ease;
}
.sheet {
  width: 100%;
  max-height: calc(100% - 36px);
  display: flex;
  flex-direction: column;
  min-height: 200px;
  background: #0f141d;
  border: 1px solid #343f4f;
  border-bottom: none;
  border-radius: 25px 25px 0 0;
  box-shadow: 0 -15px 60px #0005;
  animation: slide-up 0.25s ease;
  overflow: hidden;
  padding-bottom: 23px;
}
.sheet-handle {
  width: 34px;
  min-height: 4px;
  background: #46505e;
  border-radius: 5px;
  margin: 9px auto 0;
}
.sheet-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 17px 1px 24px;
  flex-shrink: 0;
  min-height: 51px;
}
.sheet-top .eyebrow {
  font-size: 9px;
}
.sheet-scroll {
  overflow: auto;
  scrollbar-width: none;
  padding: 9px 24px 20px;
  min-height: 0;
  flex: 1;
}
.sheet-footer {
  padding: 14px 24px 0;
  border-top: 1px solid #ffffff0a;
}
.full-overlay {
  align-items: stretch;
  backdrop-filter: none;
  background: #0b0d12;
}
.full-sheet {
  height: 100%;
  max-height: none;
  border: 0;
  border-radius: 0;
  background: #0b0d12;
  padding-top: 43px;
  padding-bottom: 18px;
}
.full-sheet .sheet-top {
  padding-bottom: 7px;
  min-height: 53px;
}
.wizard-head {
  margin: 6px 0 19px;
}
.wizard-head h2 {
  font-size: 26px;
  line-height: 1.2;
  font-weight: 450;
  letter-spacing: -0.8px;
  margin-top: 15px;
}
.wizard-head p {
  font-size: 12px;
  color: #9aa3b2;
  margin-top: 10px;
  line-height: 1.7;
}
.wizard-progress {
  display: flex;
  gap: 5px;
  align-items: center;
}
.wizard-progress > i {
  flex: 1;
  height: 3px;
  border-radius: 3px;
  background: #303a47;
}
.wizard-progress > i.active {
  background: #79b5ff;
}
.wizard-progress span {
  font-size: 9px;
  color: #95a1b0;
  margin-left: 8px;
}
.segmented {
  display: flex;
  gap: 3px;
  background: #080c12;
  padding: 4px;
  border: 1px solid #252e3c;
  border-radius: 10px;
  margin: 14px 0;
}
.segmented button {
  background: none;
  flex: 1;
  padding: 10px 5px;
  font-size: 10px;
  border-radius: 7px;
  color: #97a5b7;
  min-height: 35px;
}
.segmented button.active {
  background: #29364a;
  color: #dbe8f8;
}
.sync-note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  color: #acb9c9;
  padding: 11px 12px;
  border: 1px solid #303e4c;
  border-radius: 10px;
  margin: 14px 0;
  line-height: 1.6;
}
.sync-note svg {
  color: #8dbaf0;
}
.success {
  text-align: center;
  padding: 27px 0 13px;
}
.success-icon {
  width: 74px;
  height: 74px;
  background: #4f9dff15;
  border: 1px solid #4f9dff40;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 auto 25px;
  color: #97c9ff;
  box-shadow: 0 0 55px #4f9dff0b;
}
.success h2 {
  font-size: 29px;
  font-weight: 450;
  line-height: 1.2;
  letter-spacing: -0.8px;
}
.success p {
  font-size: 12px;
  line-height: 1.8;
  color: #9aa3b2;
  max-width: 275px;
  margin: 16px auto 24px;
}
.voice-note {
  background: #1c2635;
  border: 1px solid #35465f;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 18px;
}
.voice-note > button {
  background: none;
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  font-size: 12px;
  text-align: left;
}
.voice-note small {
  color: #99aabd;
  display: block;
  margin-top: 9px;
  font-size: 9px;
}
.waveform {
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  overflow: hidden;
}
.waveform i {
  width: 3px;
  background: #759dca;
  border-radius: 3px;
  flex-shrink: 0;
}
.waveform.recording i {
  background: #a8ccf8;
  animation: pulse-wave 0.8s ease-in-out infinite alternate;
}
.record-time {
  font: 12px monospace;
  color: #afc3db;
  text-align: center;
}
.recording-dot {
  display: inline-block;
  background: #e8a09b;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 6px;
  animation: blink 1s infinite;
}
.empty {
  text-align: center;
  color: #9ba9b9;
  padding: 35px 15px;
}
.empty > svg {
  color: #637a92;
  margin-bottom: 13px;
}
.empty h3 {
  font-size: 14px;
}
.empty p {
  font-size: 11px;
  margin: 10px 0 0;
}
.toast {
  position: absolute;
  z-index: 80;
  bottom: 109px;
  left: 20px;
  right: 20px;
  background: #d5e9fa;
  color: #12283e;
  border: 1px solid #fff8;
  box-shadow: 0 8px 35px #0006;
  border-radius: 13px;
  padding: 14px 15px;
  display: flex;
  align-items: center;
  gap: 9px;
  animation: toast-in 0.25s ease;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  pointer-events: none;
}
.toast svg {
  color: #3b739e;
}
.now-playing {
  background: radial-gradient(ellipse at 30% 22%, #2c49474a, transparent 70%), #0c1016;
}
.now-art {
  width: 100% !important;
  height: auto !important;
  aspect-ratio: 1;
  margin: 16px auto 25px;
  border-radius: 18px !important;
  box-shadow: 0 17px 40px #0004;
}
.now-art .art-type {
  font-size: 11px;
}
.now-art .art-type b {
  font-size: 36px;
  max-width: 230px;
  line-height: 1.06;
  margin-top: 11px;
}
.now-title h2 {
  font-size: 24px;
  letter-spacing: -0.7px;
  font-weight: 500;
  line-height: 1.25;
}
.now-title p {
  font-size: 12px;
  color: #a0adbb;
  margin-top: 7px;
}
.progress-range {
  appearance: none;
  width: 100%;
  height: 3px;
  border: 0;
  border-radius: 5px;
  padding: 0;
  background: #46505b;
  accent-color: #a2caff;
  cursor: pointer;
}
.progress-range::-webkit-slider-thumb {
  appearance: none;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #bddeff;
  box-shadow: 0 0 0 3px #bddeff0d;
}
.progress-times {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: #8c9cac;
  margin-top: 7px;
  font-variant-numeric: tabular-nums;
}
.player-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0 20px;
}
.big-play {
  display: grid;
  place-items: center;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: #d9e8f5;
  color: #0f1a25;
}
.player-controls .active {
  color: #86bdff;
}
.added-card {
  background: #1a2430;
  border: 1px solid #2d3c4c;
  border-radius: 13px;
  padding: 15px;
  margin-top: 19px;
}
.added-card .person-row strong {
  font-size: 11px;
}
.added-card .person-row p {
  font-size: 9px;
}
.added-card > p {
  font-size: 11px;
  line-height: 1.8;
  color: #bac6d3;
  margin-top: 11px;
}
.now-listeners {
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 10px;
  color: #8d9fb2;
  margin-top: 19px;
}
.player-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 17px;
  gap: 6px;
}
.player-actions button {
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #a5b6c8;
  font-size: 8px;
  padding: 11px 7px;
  min-width: 70px;
}
.hud {
  background: radial-gradient(ellipse at 50% 35%, #182938aa, transparent 58%), #060b10;
  color: #d4e7f3;
}
.hud .sheet-top .eyebrow {
  font-family: monospace;
  font-size: 10px;
  letter-spacing: 2px;
  color: #a0bfd7;
}
.hud .sheet-top button {
  border: 1px solid #57758d55;
}
.hud-content {
  padding: 20px 24px;
  overflow: auto;
  scrollbar-width: none;
  flex: 1;
}
.hud-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #4a6c8344;
  border-bottom: 1px solid #4a6c8344;
  padding: 14px 0;
}
.hud-top span {
  font: 9px monospace;
  letter-spacing: 1px;
  color: #8ba7bb;
}
.hud-top strong {
  display: block;
  font: 12px monospace;
  margin-top: 5px;
}
.hud-earth {
  width: 128px;
  margin: 27px auto 19px;
  box-shadow: 0 0 60px #4f9dff10;
}
.hud-track {
  text-align: center;
}
.hud-track .eyebrow {
  font-size: 8px;
  letter-spacing: 2px;
  color: #90b0c8;
}
.hud-track h2 {
  font-size: 29px;
  line-height: 1.2;
  letter-spacing: -0.7px;
  font-weight: 450;
  margin: 13px 0 9px;
}
.hud-track > p {
  font-size: 12px;
  color: #8dabbf;
}
.hud-controls {
  display: flex;
  justify-content: space-between;
  gap: 13px;
  margin: 24px 0;
}
.hud-controls button {
  border: 1px solid #7395ac77;
  background: #0d1c28aa;
  border-radius: 15px;
  min-height: 76px;
  flex: 1;
  color: #c5e3f7;
}
.hud-controls button:nth-child(2) {
  background: #bad7e9;
  color: #102335;
  flex: 1.3;
}
.hud-voice {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  font: 10px monospace;
  color: #97bdcb;
}
.hud-command {
  text-align: center;
  font-size: 10px;
  color: #6f8fa5;
  margin: 11px 0 21px;
}
.hud-comms {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  border: 1px solid #5d839e60;
  padding: 14px;
  border-radius: 11px;
  font-size: 12px;
  width: 100%;
  background: none;
  margin-bottom: 12px;
  color: #a9c6db;
  min-height: 50px;
}
.hud-comms.active {
  color: #edd592;
  border-color: #e8c87a80;
  background: #e8c87a0a;
}
.hud-save {
  width: 100%;
  min-height: 55px;
  border: 1px solid #a4c7de;
  background: #a4c7de10;
  border-radius: 11px;
  font-size: 12px;
  display: flex;
  gap: 9px;
  justify-content: center;
  align-items: center;
}
.hud-inside {
  display: flex;
  justify-content: center;
  gap: 6px;
  align-items: center;
  font-size: 10px;
  color: #8ca6b9;
  margin-top: 23px;
}
.saved-moment {
  border: 1px solid #d5bc7660;
  border-radius: 13px;
  background: #d5bc7608;
  padding: 17px;
  margin: 16px 0;
  display: flex;
  gap: 14px;
  align-items: center;
}
.saved-moment .earth {
  width: 50px;
  min-width: 50px;
}
.saved-moment h3 {
  font-size: 13px;
  color: #e6d49c;
}
.saved-moment p {
  font-size: 10px;
  color: #a9bccb;
  margin-top: 7px;
  line-height: 1.7;
}
.record-choice {
  display: flex;
  align-items: center;
  gap: 15px;
  min-height: 83px;
  padding: 17px;
  background: #192332;
  border: 1px solid #344359;
  border-radius: 14px;
  width: 100%;
  text-align: left;
  margin: 13px 0;
}
.record-choice > svg {
  color: #9ecaff;
}
.record-choice strong {
  display: block;
  font-size: 13px;
  font-weight: 500;
}
.record-choice small {
  display: block;
  font-size: 10px;
  line-height: 1.6;
  color: #92a4b9;
  margin-top: 5px;
}
.record-choice > svg:last-child {
  margin-left: auto;
}
.upload-art {
  width: 83px;
  height: 83px;
  border: 1px dashed #5d7591;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: #182332;
  margin: 16px 0 22px;
  color: #9ec3ef;
}
.upload-art span {
  font-size: 8px;
  display: block;
  margin-top: 5px;
}
.room-hero {
  border-radius: 17px;
  padding: 22px;
  background: linear-gradient(140deg, #2a473d, #16232b);
  text-align: center;
  margin: 10px 0 20px;
}
.room-hero h2 {
  font-size: 26px;
  font-weight: 450;
  margin: 15px 0 9px;
  letter-spacing: -0.6px;
}
.room-hero p {
  font-size: 12px;
  color: #b1c3bf;
}
.room-hero > svg {
  color: #bcdbbb;
}
.room-hero > .avatar-stack {
  justify-content: center;
  margin: 19px 0;
}
.room-message {
  display: flex;
  gap: 10px;
  margin: 17px 0;
}
.room-message > div {
  flex: 1;
  min-width: 0;
}
.room-message strong {
  font-size: 11px;
  font-weight: 500;
}
.room-message p {
  font-size: 12px;
  color: #a6b6c6;
  margin-top: 5px;
}
.share-row {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 13px 0;
  border-bottom: 1px solid #29313c;
}
.share-row > div {
  flex: 1;
}
.share-row strong {
  font-size: 12px;
  display: block;
  font-weight: 500;
}
.share-row p {
  font-size: 10px;
  color: #91a2b6;
  margin-top: 4px;
}
.sync-orbit {
  height: 162px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
}
.sync-orbit > .earth {
  width: 75px;
}
.sync-orbit > span {
  font: 11px monospace;
  letter-spacing: 3px;
  color: #6996c9;
}
.sync-moon {
  width: 39px;
  height: 39px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 26%, #c8c8c1, #757d84 52%, #303d4a 90%);
  box-shadow: 0 0 20px #a6c8e511;
}
.sync-details {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #2e3744;
  padding: 14px 0;
  font-size: 12px;
  color: #99aabd;
}
.sync-details strong {
  font-weight: 500;
  color: #d5e4f5;
}
.loading-bar {
  height: 3px;
  overflow: hidden;
  background: #202d40;
  border-radius: 3px;
  margin-top: 20px;
}
.loading-bar:after {
  content: "";
  display: block;
  height: 100%;
  width: 40%;
  background: #4f9dff;
  animation: loading 1s linear infinite;
}
.keyboard-hint {
  text-align: center;
  font-size: 9px;
  color: #728194;
  margin-top: 15px;
}
.end-note {
  text-align: center;
  font-size: 10px;
  color: #8392a2;
  line-height: 1.8;
  padding: 20px 5px 5px;
}
.inline-note {
  font-size: 10px;
  color: #a5b6c9;
  line-height: 1.7;
  margin-top: 12px;
}
.error-text {
  color: #efaaa1;
  font-size: 11px;
  line-height: 1.5;
  margin: 8px 0;
}
.capsule-count {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  color: #e8c87a;
  font-size: 10px;
  margin-top: 15px;
}
.counter {
  font-size: 9px;
  color: #8595a8;
  text-align: right;
  margin-top: 5px;
}
.nowrap {
  white-space: nowrap;
}
.mt-16 {
  margin-top: 16px;
}
.mt-24 {
  margin-top: 24px;
}
.mb-16 {
  margin-bottom: 16px;
}
.text-center {
  text-align: center;
}
.welcome-brand > svg {
  display: inline-block;
}
.stage {
  height: 100dvh;
  min-height: 500px;
  padding: 0;
  overflow: clip;
}
.phone {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(var(--frame-scale, 1));
}
.chip:not(.static) {
  min-height: 40px;
}
.room-list .btn {
  min-height: 38px;
}
.tab-bar button {
  min-height: 48px;
}
@media (max-width: 800px) {
  .desktop-mark {
    display: none;
  }
}
@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes slide-up {
  from {
    transform: translateY(28px);
    opacity: 0.5;
  }
  to {
    transform: none;
    opacity: 1;
  }
}
@keyframes pulse-wave {
  to {
    transform: scaleY(0.35);
  }
}
@keyframes blink {
  50% {
    opacity: 0.4;
  }
}
@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes loading {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(350%);
  }
}
@media (max-width: 1000px) {
  .desktop-caption,
  .desktop-coordinate,
  .desktop-footer {
    display: none;
  }
  .desktop-mark {
    left: 30px;
    top: 30px;
  }
  .desktop-mark small {
    max-width: 90px;
    line-height: 1.8;
  }
}
@media (max-width: 650px) {
  .desktop-mark {
    display: none;
  }
  .stage {
    padding: 20px 10px;
  }
}
@media (max-width: 440px) {
  .stage {
    padding: 0;
    min-height: 100dvh;
    display: block;
  }
  .phone {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
    width: 100%;
    height: 100dvh;
    padding: 0;
    border-radius: 0;
    box-shadow: none;
    background: #0b0d12;
  }
  .phone:before,
  .phone:after {
    display: none;
  }
  .device {
    width: 100%;
    height: 100dvh;
    border: 0;
    border-radius: 0;
  }
  .welcome-copy {
    margin-top: 4px;
  }
  .earthrise-scene {
    height: 270px;
  }
  .earthrise-scene .earth {
    left: calc(50% - 95px);
  }
  .orbit {
    left: calc(50% - 153px);
  }
  .orbit:nth-child(2) {
    left: calc(50% - 184px);
  }
  .welcome-bottom {
    padding-top: 16px;
  }
  .stage:before {
    display: none;
  }
}
@media (max-height: 760px) and (max-width: 440px) {
  .earthrise-scene {
    height: 220px;
  }
  .earthrise-scene .earth {
    width: 155px;
    left: calc(50% - 77px);
    top: 38px;
  }
  .lunar-horizon {
    top: 190px;
  }
  .welcome-brand {
    margin-top: 10px;
  }
  .welcome-copy h1 {
    font-size: 34px;
    margin: 12px 0;
  }
  .welcome-bottom > p {
    margin-top: 12px;
  }
  .welcome-bottom {
    padding-bottom: 14px;
  }
  .step-dots {
    margin-top: 11px;
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *:before,
  *:after {
    animation: none !important;
    transition: none !important;
  }
}
`;

function Onboarding({
  profile,
  setProfile,
  carry,
  setCarry,
  connections,
  toggleConnect,
  finish,
  toast,
  openRoom,
  step,
  setStep,
}) {
  const [heritageQuery, setHeritageQuery] = useState('');
  const [songQuery, setSongQuery] = useState('');
  const contentRef = useRef(null);
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [step]);
  const update = (key, value) => setProfile((p) => ({ ...p, [key]: value }));
  const toggle = (key, value) =>
    update(
      key,
      profile[key].includes(value)
        ? profile[key].filter((x) => x !== value)
        : [...profile[key], value],
    );
  const stepNames = [
    'Welcome',
    'A place for you',
    'Your worlds',
    'Your soundtrack',
    'Your carry-on',
    'Your people',
  ];
  const next = () => {
    if (step === 1 && !profile.name.trim()) return;
    if (step === 4 && (!carry.song || !carry.note.trim())) return;
    if (step === 5) finish();
    else setStep((s) => s + 1);
  };
  if (step === 0)
    return (
      <div className="welcome screen">
        <div className="welcome-brand">
          <Moon size={19} strokeWidth={1.2} /> LUNAR<small>EST. 2033 · THE MOON</small>
        </div>
        <div className="earthrise-scene">
          <div className="orbit" />
          <div className="orbit" />
          <Earth />
          <div className="lunar-horizon">
            <div className="horizon-lines" />
          </div>
        </div>
        <div className="welcome-copy">
          <div className="eyebrow">384,400 km from home.</div>
          <h1>
            A little closer
            <br />
            to home.
          </h1>
          <p>
            Welcome to Lunar —<br />
            the soundtrack of our colony.
          </p>
        </div>
        <div className="welcome-bottom">
          <Button className="full-width" onClick={next}>
            Get started <ArrowRight size={17} />
          </Button>
          <p>ONE MOON. MANY WORLDS.</p>
          <div className="step-dots" aria-label="Onboarding step 1 of 6">
            {stepNames.map((s, i) => (
              <i key={s} className={i === 0 ? 'active' : ''} />
            ))}
          </div>
        </div>
      </div>
    );
  return (
    <div className="onboard">
      <div className="onboard-header">
        <IconButton
          icon={ArrowLeft}
          label="Previous onboarding step"
          onClick={() => setStep((s) => s - 1)}
        />
        <div className="step-bars" aria-label={'Onboarding step ' + (step + 1) + ' of 6'}>
          {stepNames.map((s, i) => (
            <i key={s} className={i <= step ? 'active' : ''} />
          ))}
        </div>
        <span>{String(step + 1).padStart(2, '0')} / 06</span>
      </div>
      <div className="onboard-content screen" key={step} ref={contentRef}>
        <div className="eyebrow gold">{stepNames[step]}</div>
        {step === 1 && (
          <>
            <h1 className="title">
              Make yourself
              <br />
              at home.
            </h1>
            <p className="subtitle">Around here, nobody is a stranger for long.</p>
            <div className="photo-pick">
              <button
                aria-label="Choose profile illustration"
                onClick={() => {
                  update('color', profile.color === '#8ca9bf' ? '#b99e83' : '#8ca9bf');
                  toast('Profile illustration updated');
                }}
              >
                <Avatar person={profile} size={72} />
                <span className="photo-plus">
                  <Plus size={13} />
                </span>
              </button>
              <div>
                <strong className="text-sm font-medium">A face to a name</strong>
                <p>Choose your colony portrait</p>
              </div>
            </div>
            <Field label="What should we call you?">
              <input
                value={profile.name}
                maxLength={50}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Your name"
                autoComplete="off"
              />
            </Field>
            <Field label="Your role">
              <select value={profile.role} onChange={(e) => update('role', e.target.value)}>
                {[
                  'Habitat Designer',
                  'Habitat Engineer',
                  'Botanist',
                  'Research Scientist',
                  'Medical Officer',
                  'Communications Officer',
                  'Colony Cook',
                  'Robotics Specialist',
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </Field>
            <Field label="Your little corner of the Moon">
              <select value={profile.habitat} onChange={(e) => update('habitat', e.target.value)}>
                {[
                  'Tranquility Module B',
                  'Tranquility Module A',
                  'Horizon Module C',
                  'Unity Module A',
                  'Unity Module B',
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </Field>
            <div className="welcome-note">
              <Users size={17} />
              <span>
                512 people. Countless stories.
                <br />
                There’s room for yours.
              </span>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="title">
              Home can be
              <br />
              more than one place.
            </h1>
            <p className="subtitle">
              Select as many as fit you.
              <br />
              You choose what others see.
            </p>
            <SearchBox
              value={heritageQuery}
              onChange={setHeritageQuery}
              placeholder="Find a heritage"
            />
            <div className="chips mt-16">
              {HERITAGES.filter((x) => x.toLowerCase().includes(heritageQuery.toLowerCase())).map(
                (h) => (
                  <Chip
                    key={h}
                    selected={profile.heritages.includes(h)}
                    onClick={() => toggle('heritages', h)}
                  >
                    {h}
                  </Chip>
                ),
              )}
            </div>
            {!HERITAGES.some((x) => x.toLowerCase().includes(heritageQuery.toLowerCase())) && (
              <p className="small-copy mt-16">
                Use “Other / self-describe” to add your own heritage.
              </p>
            )}
            {profile.heritages.includes('Other / self-describe') && (
              <div className="mt-16">
                <Field label="Your heritage, in your words">
                  <input
                    value={profile.customHeritage}
                    onChange={(e) => update('customHeritage', e.target.value)}
                    placeholder="How you describe yourself"
                  />
                </Field>
              </div>
            )}
            <div className="mt-24">
              <Field label="Places you’ve called home" optional>
                <input
                  value={profile.homes}
                  onChange={(e) => update('homes', e.target.value)}
                  placeholder="e.g. Toronto, Manila, wherever my family is"
                />
              </Field>
            </div>
            <div className="selection-section">
              <h3>Languages you speak</h3>
              <div className="chips">
                {LANGUAGES.map((l) => (
                  <Chip
                    key={l}
                    selected={profile.languages.includes(l)}
                    onClick={() => toggle('languages', l)}
                  >
                    {l}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="visibility-row">
              <Globe2 size={18} className="muted" />
              <div>
                <strong>Share my cultural background</strong>
                <p>Your heritages, home places, and languages appear on your profile.</p>
              </div>
              <button
                className={cx('toggle', profile.visible && 'on')}
                role="switch"
                aria-checked={profile.visible}
                aria-label="Share cultural background"
                onClick={() => update('visible', !profile.visible)}
              />
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h1 className="title">What feels like you?</h1>
            <p className="subtitle">
              Old favorites. New discoveries.
              <br />
              There’s no wrong mix.
            </p>
            <div className="chips">
              {GENRES.map((g) => (
                <Chip
                  key={g}
                  selected={profile.genres.includes(g)}
                  onClick={() => toggle('genres', g)}
                >
                  {g}
                </Chip>
              ))}
            </div>
            <div className="selection-section mt-24">
              <h3>Songs that sound like home</h3>
              <SearchBox
                value={songQuery}
                onChange={setSongQuery}
                placeholder="Find a song, artist, or tradition"
              />
              {SONGS.filter((s) => !s.pending && matches(s, songQuery))
                .slice(0, 4)
                .map((s) => (
                  <SongRow
                    key={s.id}
                    song={s}
                    selected={profile.homeSongs.includes(s.id)}
                    onClick={() => toggle('homeSongs', s.id)}
                  />
                ))}
              {!SONGS.some((s) => !s.pending && matches(s, songQuery)) && <Empty />}
            </div>
            <p className="small-copy">
              We’ll help you find familiar sounds and people who open up new worlds.
            </p>
          </>
        )}
        {step === 4 && (
          <>
            <h1 className="title">
              One song.
              <br />A whole world.
            </h1>
            <p className="subtitle">
              Every colonist brings one song from Earth.
              <br />
              What will yours be?
            </p>
            <SearchBox
              value={songQuery}
              onChange={setSongQuery}
              placeholder="Find your carry-on song"
            />
            {SONGS.filter((s) => s.source === 'earth' && !s.pending && matches(s, songQuery))
              .slice(0, 4)
              .map((s) => (
                <SongRow
                  key={s.id}
                  song={s}
                  selected={carry.song?.id === s.id}
                  onClick={() => setCarry((c) => ({ ...c, song: s }))}
                />
              ))}
            {!SONGS.some((s) => s.source === 'earth' && !s.pending && matches(s, songQuery)) && (
              <Empty />
            )}
            {carry.song && (
              <div className="mt-16">
                <Field label="What are you carrying with it?">
                  <textarea
                    value={carry.note}
                    onChange={(e) => setCarry((c) => ({ ...c, note: e.target.value }))}
                    maxLength={400}
                    placeholder="A person, a place, a tiny ordinary moment…"
                  />
                </Field>
              </div>
            )}
            <div className="welcome-note">
              <LockKeyhole size={17} />
              <span>
                Your song and its story join the permanent colony archive. A little piece of Earth,
                kept here forever.
              </span>
            </div>
          </>
        )}
        {step === 5 && (
          <>
            <h1 className="title">Find your orbit.</h1>
            <p className="subtitle">
              A few people to make this place
              <br />
              feel a little more like home.
            </p>
            {['kenji', 'amara', 'elif'].map((id, i) => {
              const p = personById(id),
                shared = p.genres.filter((g) => profile.genres.includes(g));
              return (
                <div className="card connection-card" key={id}>
                  <div className="person-row">
                    <Avatar person={p} size={42} />
                    <div>
                      <strong>{p.short}</strong>
                      <p>{p.role}</p>
                    </div>
                    <Button
                      variant={connections.includes(id) ? 'secondary' : 'primary'}
                      className="btn-sm"
                      onClick={() => toggleConnect(id)}
                    >
                      {connections.includes(id) ? (
                        <>
                          <Check size={12} /> Connected
                        </>
                      ) : (
                        <>
                          <Plus size={12} /> Connect
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="chips">
                    {p.heritages.map((h) => (
                      <Chip key={h}>{h}</Chip>
                    ))}
                  </div>
                  <p className="match-reason">
                    {shared.length
                      ? 'You both love ' + shared.join(' & ')
                      : [
                          'A little Bossa Nova for your new beginning.',
                          'Your next favorite rhythm might be Afrobeats.',
                          'A warm welcome, and something new to hear.',
                        ][i]}
                  </p>
                </div>
              );
            })}
            <SectionTitle>Your first listening room</SectionTitle>
            <div className="room-card">
              <div className="person-row">
                <div className="room-icon">
                  <Sprout size={20} />
                </div>
                <div>
                  <h3>Greenhouse Grooves</h3>
                  <p>
                    <i className="live-dot" />
                    12 listening · Hosted by Imani
                  </p>
                </div>
                <Button className="btn-sm" variant="secondary" onClick={() => openRoom(ROOMS[0])}>
                  Join
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="onboard-footer">
        <Button
          className="full-width"
          onClick={next}
          disabled={
            (step === 1 && !profile.name.trim()) ||
            (step === 4 && (!carry.song || !carry.note.trim()))
          }
        >
          {step === 5 ? 'Enter the colony' : 'Continue'}
          <ArrowRight size={17} />
        </Button>
        {step === 4 && (
          <p className="keyboard-hint">Choose a song and add a few words to continue.</p>
        )}
      </div>
    </div>
  );
}

function WeeklyTrack({
  song,
  person,
  play,
  current,
  openPerson,
  toast,
  reactions,
  setReactions,
  replies,
  setReplies,
  expanded,
  setExpanded,
}) {
  const [translated, setTranslated] = useState(false),
    [reply, setReply] = useState('');
  const open = expanded === song.id;
  const react = (type) => {
    const key = song.id + '-' + type;
    setReactions((r) => ({ ...r, [key]: !r[key] }));
  };
  const submit = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setReplies((r) => ({ ...r, [song.id]: [...(r[song.id] || []), reply.trim()] }));
    setReply('');
    toast('Your reply is part of the conversation');
  };
  return (
    <article className="track-card">
      <div className="track-top">
        <button
          className="bg-transparent p-0"
          aria-label={'Play ' + song.title}
          onClick={() => play(song)}
        >
          <Art song={song} size={48} />
        </button>
        <button
          className="track-open"
          aria-expanded={open}
          onClick={() => setExpanded(open ? null : song.id)}
        >
          <strong className={current ? 'blue' : ''}>{song.title}</strong>
          <span>{song.artist}</span>
          {song.pending && <small className="gold">Arriving in the next sync</small>}
        </button>
        <IconButton
          icon={current ? AudioLines : Play}
          label={'Play ' + song.title}
          onClick={() => play(song)}
        />
      </div>
      <div className="track-by">
        <Avatar person={person} size={21} />
        <button onClick={() => openPerson(person)}>
          From {person.short || person.name.split(' ')[0]}
        </button>
        <div className="chips">
          {person.heritages.slice(0, 2).map((h) => (
            <Chip key={h}>{h}</Chip>
          ))}
        </div>
      </div>
      {!open && (
        <button className="track-note preview" onClick={() => setExpanded(song.id)}>
          “{song.translation || song.note}”
        </button>
      )}
      {open && (
        <div className="note-expanded">
          <p>“{translated && song.translation ? song.translation : song.note}”</p>
          {song.translation && (
            <button className="text-action" onClick={() => setTranslated((t) => !t)}>
              <Languages size={13} />
              {translated ? 'Show original · ' + song.language : 'Translate to English'}
            </button>
          )}
          {song.lyricTranslation && (
            <p className="inline-note">Lyric translation: {song.lyricTranslation}</p>
          )}
          {song.voice && (
            <div className="sync-note">
              <Mic size={14} />
              Voice note attached · {time(song.voice)} · simulated
            </div>
          )}
          <div className="reactions">
            {[
              [Heart, 'heart', 'Love', 18],
              [Home, 'home', 'Feels like home', 7],
              [Sparkles, 'learn', 'Teach me more', 4],
            ].map(([Icon, type, label, count]) => (
              <button
                key={type}
                aria-label={label}
                aria-pressed={!!reactions[song.id + '-' + type]}
                className={reactions[song.id + '-' + type] ? 'selected' : ''}
                onClick={() => react(type)}
              >
                <Icon size={12} />
                {type === 'heart' ? count + (reactions[song.id + '-' + type] ? 1 : 0) : label}
              </button>
            ))}
          </div>
          {(replies[song.id] || []).map((r, i) => (
            <p className="reply" key={i}>
              <strong>You</strong> · {r}
            </p>
          ))}
          <form className="reply-box" onSubmit={submit}>
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="A memory, a question, a hello…"
              aria-label={'Reply to ' + person.short}
            />
            <IconButton icon={Send} label="Send reply" type="submit" disabled={!reply.trim()} />
          </form>
          <button className="text-action mt-16" onClick={() => openPerson(person)}>
            Meet {person.short || person.name.split(' ')[0]}
            <ArrowUpRight size={13} />
          </button>
        </div>
      )}
    </article>
  );
}

function AddWeekly({
  initialSong,
  completed = false,
  songs,
  profile,
  onPublish,
  onClose,
  onShare,
  toast,
  capsule = false,
}) {
  const [step, setStep] = useState(completed ? 3 : 0),
    [source, setSource] = useState('Earth Library'),
    [query, setQuery] = useState(''),
    [selected, setSelected] = useState(initialSong || null),
    [note, setNote] = useState(''),
    [language, setLanguage] = useState('English'),
    [translation, setTranslation] = useState(''),
    [recording, setRecording] = useState(false),
    [seconds, setSeconds] = useState(0),
    [publishing, setPublishing] = useState(false);
  const scroll = useRef(null),
    timer = useRef(null);
  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    scroll.current?.scrollTo(0, 0);
  }, [step]);
  const candidates = songs
    .filter((s) =>
      source === 'Earth Library'
        ? s.source === 'earth' || s.source === 'cradle'
        : source === 'Made on the Moon'
          ? s.source === 'moon' && s.visibility !== 'Private'
          : s.contributor === 'you',
    )
    .filter((s) => matches(s, query));
  const publish = () => {
    if (publishing) return;
    setPublishing(true);
    timer.current = setTimeout(() => {
      onPublish({
        ...selected,
        id: (capsule ? 'capsule-' : 'weekly-') + Date.now(),
        originalId: selected.id,
        contributor: 'you',
        note: note.trim(),
        language,
        translation: null,
        lyricTranslation: translation,
        voice: seconds,
      });
      setPublishing(false);
      setStep(3);
    }, 650);
  };
  return (
    <Overlay
      title={capsule ? 'Songs for Ayla · Time capsule' : 'Your weekly contribution'}
      onClose={onClose}
    >
      <div className="sheet-scroll" ref={scroll}>
        <div className="wizard-head">
          <div className="wizard-progress">
            {[0, 1, 2, 3].map((i) => (
              <i key={i} className={i <= step ? 'active' : ''} />
            ))}
            <span>{step + 1} / 4</span>
          </div>
          {step < 3 && (
            <>
              <h2>
                {['Start with a song.', 'Every song has a story.', 'A little piece of you.'][step]}
              </h2>
              <p>
                {capsule
                  ? [
                      'A song for Ayla’s eighteenth birthday, in 2051.',
                      'What would you like her future self to know?',
                      'Your song and note will wait safely in the capsule.',
                    ][step]
                  : [
                      'One colonist. One song. A thousand connections.',
                      'Why this song? What does it mean to you?',
                      'Here’s how your story will appear in Week 34.',
                    ][step]}
              </p>
            </>
          )}
        </div>
        {step === 0 && (
          <>
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder="Search songs, artists, traditions"
            />
            <div className="segmented" role="tablist" aria-label="Song library">
              {['Earth Library', 'Made on the Moon', 'My Uploads'].map((t) => (
                <button
                  role="tab"
                  aria-selected={source === t}
                  key={t}
                  className={source === t ? 'active' : ''}
                  onClick={() => setSource(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            {source === 'Earth Library' && (
              <div className="sync-note">
                <EarthIcon size={16} />
                <span>
                  Our library lives here on the Moon.
                  <br />
                  New songs arrive in scheduled Earth syncs.
                </span>
              </div>
            )}
            {candidates.length ? (
              candidates.map((s) => (
                <SongRow
                  key={s.id}
                  song={s}
                  selected={selected?.id === s.id}
                  onClick={() => setSelected(s)}
                />
              ))
            ) : (
              <Empty
                title={
                  source === 'My Uploads' ? 'Your first song starts with you' : 'No songs found'
                }
              >
                {source === 'My Uploads'
                  ? 'Use “Upload your music” in Explore to add a recording, then find it here.'
                  : 'Try a different song, artist, or tradition.'}
              </Empty>
            )}
          </>
        )}
        {step === 1 && (
          <>
            <SongRow
              song={selected}
              onClick={() => setStep(0)}
              right={<Check size={17} className="blue" />}
            />
            <div className="mt-16">
              <Field
                label={capsule ? 'A note for Ayla' : 'Why this song? What does it mean to you?'}
              >
                <textarea
                  autoFocus
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={600}
                  placeholder={capsule ? 'Dear Ayla, when you hear this…' : 'It takes me back to…'}
                  rows={5}
                />
                <div className="counter">{note.length} / 600</div>
              </Field>
            </div>
            <div className="voice-note">
              <button
                onClick={() => {
                  if (recording && seconds === 0) setSeconds(1);
                  setRecording((r) => !r);
                }}
              >
                <span className={recording ? 'recording-dot' : ''} />
                {recording ? <Square size={15} /> : <Mic size={17} />}{' '}
                {recording
                  ? 'Stop recording · ' + time(seconds)
                  : seconds
                    ? 'Voice note saved · ' + time(seconds) + ' · Record more'
                    : 'Add a voice note'}
                <span className="ml-auto text-[9px] text-slate-400">Optional</span>
              </button>
              {recording && <Waveform active />}
              <small>Simulated recording — no microphone needed.</small>
            </div>
            <Field label="Language of your note">
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                {LANGUAGES.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </Field>
            <Field label="A lyric translation" optional>
              <textarea
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                placeholder="Share a line in your own words…"
                rows={2}
              />
            </Field>
          </>
        )}
        {step === 2 && (
          <>
            <div className="card">
              <div className="person-row">
                <Avatar person={profile} size={37} />
                <div>
                  <strong>{profile.name}</strong>
                  <p>{profile.role}</p>
                </div>
                <span className="eyebrow blue" style={{ fontSize: 8 }}>
                  YOU
                </span>
              </div>
              <div className="chips mt-16">
                {profile.visible &&
                  profile.heritages
                    .filter((h) => h !== 'Other / self-describe')
                    .map((h) => <Chip key={h}>{h}</Chip>)}
              </div>
              <SongRow
                song={selected}
                onClick={() => setStep(0)}
                right={<Music2 size={17} className="blue" />}
              />
              <p className="text-[13px] leading-7 text-slate-300 mt-4">“{note}”</p>
              <p className="inline-note">
                {language}
                {seconds > 0 ? ' · Voice note attached · ' + time(seconds) : ''}
              </p>
              {translation && <p className="inline-note">Lyric translation: {translation}</p>}
            </div>
            <div className="welcome-note">
              <ShieldCheck size={17} />
              <span>
                {capsule
                  ? 'Sealed until Ayla turns 18 in 2051. Your contribution becomes part of our history.'
                  : selected.pending
                    ? 'Your story joins the Weekly instantly. The song becomes playable after the next Earth sync.'
                    : 'Shared with the whole colony, instantly. Your song becomes part of our history.'}
              </span>
            </div>
            {publishing && (
              <div role="status">
                <div className="loading-bar" />
                <p className="keyboard-hint">
                  {capsule ? 'Sealing your contribution…' : 'Adding your story…'}
                </p>
              </div>
            )}
          </>
        )}
        {step === 3 && (
          <div className="success">
            <div className="success-icon">
              {capsule ? <LockKeyhole size={30} /> : <CheckCheck size={33} />}
            </div>
            <div className="eyebrow gold">
              {capsule ? 'A gift for 2051' : 'Week 34 · A song from your childhood'}
            </div>
            <h2 className="mt-16">
              {capsule ? (
                <>
                  Safe for her
                  <br />
                  future self.
                </>
              ) : (
                <>
                  Your song is on its
                  <br />
                  way into the Weekly.
                </>
              )}
            </h2>
            <p>
              {capsule
                ? 'Your song and words are sealed in Ayla’s time capsule. A small piece of today, waiting for tomorrow.'
                : selected.pending
                  ? 'Your note is already here. Your song is arriving in the next sync — we’ve saved its place.'
                  : 'Your story is live in the colony. Someone’s about to hear a little of your world.'}
            </p>
            <div className="card">
              <SongRow
                song={selected}
                onClick={() =>
                  toast(
                    capsule
                      ? 'Sealed in Songs for Ayla until 2051'
                      : 'Your contribution is ready in the Weekly',
                  )
                }
                right={<Check size={18} className="blue" />}
              />
            </div>
            {!capsule && (
              <Button
                variant="secondary"
                className="full-width mt-16"
                onClick={() => onShare(selected)}
              >
                <Send size={15} />
                Share to a colonist
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="sheet-footer">
        <div className="flex gap-2">
          {step > 0 && step < 3 && (
            <Button
              variant="ghost"
              aria-label="Previous contribution step"
              onClick={() => {
                setRecording(false);
                setStep((s) => s - 1);
              }}
              disabled={publishing}
            >
              <ArrowLeft size={17} />
            </Button>
          )}
          <Button
            className="full-width"
            disabled={
              (step === 0 && !selected) || (step === 1 && (!note.trim() || recording)) || publishing
            }
            onClick={() =>
              step === 2 ? publish() : step === 3 ? onClose() : setStep((s) => s + 1)
            }
          >
            {step === 0
              ? 'Give it a story'
              : step === 1
                ? 'Preview contribution'
                : step === 2
                  ? publishing
                    ? 'Saving…'
                    : capsule
                      ? 'Seal for 2051'
                      : 'Add to the Weekly'
                  : 'Back to the colony'}
            {step < 2 && <ArrowRight size={16} />}
          </Button>
        </div>
      </div>
    </Overlay>
  );
}

function CreateMusic({ onClose, onPublish, toast }) {
  const [step, setStep] = useState(0),
    [method, setMethod] = useState(''),
    [recording, setRecording] = useState(false),
    [seconds, setSeconds] = useState(0),
    [title, setTitle] = useState(''),
    [language, setLanguage] = useState('English'),
    [genre, setGenre] = useState('Electronic'),
    [influences, setInfluences] = useState([]),
    [story, setStory] = useState(''),
    [lyrics, setLyrics] = useState(''),
    [translation, setTranslation] = useState(''),
    [visibility, setVisibility] = useState('Entire colony'),
    [art, setArt] = useState(17),
    [busy, setBusy] = useState(false);
  const timer = useRef(null);
  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);
  useEffect(() => () => clearTimeout(timer.current), []);
  const publish = () => {
    setBusy(true);
    timer.current = setTimeout(() => {
      onPublish({
        id: 'upload-' + Date.now(),
        title: title.trim(),
        artist: 'You',
        genre,
        language,
        heritages: influences,
        contributor: 'you',
        note: story.trim(),
        lyrics,
        lyricTranslation: translation,
        visibility,
        duration: Math.max(seconds, 154),
        art,
        source: 'moon',
        pending: false,
      });
      setBusy(false);
      setStep(2);
    }, 700);
  };
  return (
    <Overlay title="Made on the Moon" onClose={onClose}>
      <div className="sheet-scroll">
        <div className="wizard-head">
          <h2>
            {step === 0
              ? 'Make a little history.'
              : step === 1
                ? 'Give your sound a home.'
                : 'A new sound, from here.'}
          </h2>
          <p>
            {step === 0
              ? 'A hum, a melody, a moment. The colony is listening.'
              : step === 1
                ? 'The story matters just as much as the song.'
                : 'No trip to Earth needed.'}
          </p>
        </div>
        {step === 0 && (
          <>
            {!method && (
              <>
                <button className="record-choice" onClick={() => setMethod('record')}>
                  <Mic size={26} />
                  <span>
                    <strong>Record in app</strong>
                    <small>Something only you could make.</small>
                  </span>
                  <ChevronRight size={17} />
                </button>
                <button
                  className="record-choice"
                  onClick={() => {
                    setMethod('upload');
                    setBusy(true);
                    timer.current = setTimeout(() => setBusy(false), 700);
                  }}
                >
                  <Upload size={24} />
                  <span>
                    <strong>Upload a file</strong>
                    <small>Try a sample audio file · simulated</small>
                  </span>
                  <ChevronRight size={17} />
                </button>
                <p className="keyboard-hint">Prototype mode · no microphone or real file needed.</p>
              </>
            )}
            {method === 'record' && (
              <div className="card text-center">
                <Mic size={25} className="blue" />
                <Waveform active={recording} />
                <div className="record-time">
                  {recording && <i className="recording-dot" />}
                  {time(seconds)}
                </div>
                <Button
                  variant={recording ? 'secondary' : 'primary'}
                  className="mt-16"
                  onClick={() => {
                    if (recording && seconds === 0) setSeconds(1);
                    setRecording((r) => !r);
                  }}
                >
                  {recording ? (
                    <>
                      <Square size={16} />
                      Stop recording
                    </>
                  ) : (
                    <>
                      <Mic size={16} />
                      {seconds ? 'Record more' : 'Start recording'}
                    </>
                  )}
                </Button>
                <p className="keyboard-hint">Simulated recording · no audio is captured.</p>
              </div>
            )}
            {method === 'upload' && (
              <div className="card text-center">
                <Upload size={26} className="blue" />
                <p className="mt-16 text-sm">
                  {busy ? 'Preparing your sample…' : 'habitat-session.wav'}
                </p>
                {busy ? (
                  <div className="loading-bar" />
                ) : (
                  <p className="small-copy mt-16">
                    <Check size={14} /> Ready · 2:34 · WAV · 24 MB
                  </p>
                )}
                <p className="keyboard-hint">Sample file for this prototype.</p>
              </div>
            )}
            {method && (
              <button
                className="text-action mt-16"
                onClick={() => {
                  setMethod('');
                  setRecording(false);
                  setSeconds(0);
                }}
              >
                Choose another method
              </button>
            )}
          </>
        )}
        {step === 1 && (
          <>
            <button
              className="upload-art"
              aria-label="Change artwork"
              onClick={() => {
                setArt((a) => a + 1);
                toast('Artwork updated');
              }}
            >
              <Art song={{ art }} size={64} />
            </button>
            <Field label="Title">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What shall we call it?"
                maxLength={70}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Language">
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  {['Instrumental', ...LANGUAGES].map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </Field>
              <Field label="Genre">
                <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                  {[...GENRES, 'Ambient', 'Experimental', 'Spoken Word'].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="selection-section">
              <h3>Cultural influences · choose freely</h3>
              <div className="chips">
                {[
                  'Brazilian',
                  'Japanese',
                  'Turkish',
                  'Nigerian',
                  'Indian',
                  'Mexican',
                  'Korean',
                  'Indonesian',
                  'Kenyan',
                  'Egyptian',
                  'Chilean',
                  'Canadian',
                  'German',
                  'Other',
                ].map((h) => (
                  <Chip
                    key={h}
                    selected={influences.includes(h)}
                    onClick={() =>
                      setInfluences((v) => (v.includes(h) ? v.filter((x) => x !== h) : [...v, h]))
                    }
                  >
                    {h}
                  </Chip>
                ))}
              </div>
            </div>
            <Field label="The story behind it">
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Where did this sound begin?"
                maxLength={600}
              />
            </Field>
            <Field label="Lyrics" optional>
              <textarea
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                placeholder="Your own words…"
                rows={2}
              />
            </Field>
            <Field label="Translation" optional>
              <textarea
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                placeholder="Open your words to another world…"
                rows={2}
              />
            </Field>
            <Field label="Who can hear it?">
              <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                {['Private', 'Crew', 'Habitat', 'Entire colony'].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </Field>
            <p className="small-copy">
              {visibility === 'Private'
                ? 'Only you can see this recording in your uploads.'
                : visibility === 'Crew'
                  ? 'Shared instantly with the people in your crew.'
                  : visibility === 'Habitat'
                    ? 'Shared instantly with your habitat neighbors.'
                    : 'Shared instantly with all 512 colonists.'}
            </p>
            {busy && <div className="loading-bar" />}
          </>
        )}
        {step === 2 && (
          <div className="success">
            <div className="success-icon">
              <Music2 size={31} />
            </div>
            <h2>
              {visibility === 'Private'
                ? 'Your own little world.'
                : 'Made on the Moon.\nMade by you.'}
            </h2>
            <p>
              “{title}” is now in{' '}
              {visibility === 'Private' ? 'your private uploads' : 'Made on the Moon'}.{' '}
              {visibility === 'Entire colony'
                ? 'The whole colony can listen, instantly.'
                : visibility === 'Private'
                  ? 'Only you can hear it.'
                  : 'Your ' + visibility.toLowerCase() + ' can listen, instantly.'}
            </p>
            <div className="flex justify-center">
              <Art song={{ art, title, artist: 'You' }} size={190} />
            </div>
          </div>
        )}
      </div>
      {(method || step > 0) && (
        <div className="sheet-footer">
          <Button
            className="full-width"
            disabled={
              busy ||
              recording ||
              (step === 0 && method === 'record' && !seconds) ||
              (step === 1 && (!title.trim() || !story.trim()))
            }
            onClick={() => (step === 0 ? setStep(1) : step === 1 ? publish() : onClose())}
          >
            {step === 0
              ? 'Add the details'
              : step === 1
                ? busy
                  ? 'Publishing…'
                  : visibility === 'Private'
                    ? 'Save privately'
                    : 'Publish your music'
                : 'Back to the colony'}
            <ArrowRight size={16} />
          </Button>
        </div>
      )}
    </Overlay>
  );
}

function ProfileView({
  person,
  own,
  carry,
  connections,
  contribution,
  uploads,
  moments,
  cultures,
  play,
  openPerson,
  edit,
  restart,
  toggleConnect,
}) {
  const visible = own || person.visible !== false;
  return (
    <>
      <div className="profile-header">
        <Avatar person={person} size={81} />
        <h1>{person.name}</h1>
        <p>{person.role}</p>
        <small>{person.habitat}</small>
        {visible ? (
          <>
            <div className="chips">
              {person.heritages
                .filter((h) => h !== 'Other / self-describe')
                .map((h) => (
                  <Chip key={h}>{h}</Chip>
                ))}
              {person.customHeritage && <Chip>{person.customHeritage}</Chip>}
            </div>
            <div className="profile-languages">
              <Languages size={12} />
              {person.languages.join(' · ') || 'Many ways to say hello'}
            </div>
            {person.homes && <p className="small-copy">Home has been {person.homes}</p>}
            {own && person.visible === false && (
              <p className="inline-note">
                <LockKeyhole size={11} /> Cultural background is visible only to you
              </p>
            )}
          </>
        ) : (
          <p className="small-copy mt-16">Cultural background kept private</p>
        )}
        {own ? (
          <Button variant="secondary" className="btn-sm" onClick={edit}>
            <Settings2 size={13} />
            Edit profile
          </Button>
        ) : (
          <>
            <p className="small-copy mx-auto max-w-[290px]">{person.bio}</p>
            <Button
              variant={connections.includes(person.id) ? 'secondary' : 'primary'}
              className="btn-sm"
              onClick={() => toggleConnect(person.id)}
            >
              {connections.includes(person.id) ? (
                <>
                  <Check size={13} />
                  Connected
                </>
              ) : (
                <>
                  <Plus size={13} />
                  Connect with {person.short}
                </>
              )}
            </Button>
          </>
        )}
      </div>
      <div className="stats-grid">
        {[
          [own ? connections.length : person.connections, 'Colonists connected with'],
          [own ? (contribution ? 1 : 0) : 12, 'Weekly contributions'],
          [
            own ? (contribution ? Math.max(cultures, 1) : 0) : person.heritages.length + 4,
            'Cultures shared',
          ],
          [own ? moments.length : 3, 'Earthrise moments'],
        ].map(([n, l]) => (
          <div key={l}>
            <b>{n}</b>
            <span>{l}</span>
          </div>
        ))}
      </div>
      <div className="carry-card">
        <div className="eyebrow">
          <Rocket size={13} /> My carry-on from Earth
        </div>
        <SongRow song={carry.song} onClick={() => play(carry.song)} />
        <blockquote>“{carry.note}”</blockquote>
      </div>
      <SectionTitle>Stories I’ve shared</SectionTitle>
      {own && !contribution ? (
        <Empty title="Your first story is waiting">
          One song is all it takes to start a connection. Add yours to this week’s Weekly.
        </Empty>
      ) : (
        (own ? [contribution] : SONGS.filter((s) => s.contributor === person.id).slice(0, 2)).map(
          (s) => (
            <div className="card mb-16" key={s.id}>
              <span className="eyebrow" style={{ fontSize: 8 }}>
                Consortium Weekly · Week 34
              </span>
              <SongRow song={s} onClick={() => play(s)} />
              <p className="small-copy mt-16">“{s.translation || s.note}”</p>
            </div>
          ),
        )
      )}
      <SectionTitle>Made on the Moon</SectionTitle>
      {uploads.length ? (
        uploads.map((s) => (
          <SongRow
            key={s.id}
            song={s}
            onClick={() => play(s)}
            subtitle={s.genre + ' · ' + (s.visibility || 'Entire colony')}
          />
        ))
      ) : (
        <p className="small-copy">No recordings yet. Your voice belongs here, too.</p>
      )}
      {own && (
        <div className="profile-footer">
          COLONIST SINCE 2033 · ONE OF 512
          <br />A whole world, in one person.<button onClick={restart}>Restart onboarding</button>
        </div>
      )}
    </>
  );
}

function Room({
  room,
  joined,
  join,
  leave,
  close,
  play,
  playing,
  currentSong,
  onToggle,
  toast,
  profile,
}) {
  const [message, setMessage] = useState(''),
    [messages, setMessages] = useState([]);
  const send = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessages((m) => [...m, message.trim()]);
    setMessage('');
    toast('Message shared with the room');
  };
  return (
    <Overlay title="A room for a little company" onClose={close}>
      <div className="sheet-scroll">
        <div className="room-hero">
          <room.icon size={31} />
          <h2>{room.name}</h2>
          <p>{room.description}</p>
          <AvatarStack people={room.people} size={36} />
          <p>
            <i className="live-dot" />
            {room.count + (joined ? 1 : 0)} listening · Hosted by {personById(room.host).short}
          </p>
        </div>
        <div className="row-between">
          <span className="eyebrow">Playing together</span>
          <span className="text-[9px] text-blue-300">LOCAL · IN SYNC</span>
        </div>
        <SongRow
          song={SONGS[room.song]}
          current={currentSong?.id === SONGS[room.song].id && playing}
          onClick={() => {
            if (!joined) join();
            else if (currentSong?.id === SONGS[room.song].id) onToggle();
            else play(SONGS[room.song]);
          }}
        />
        <SectionTitle>The common room, from anywhere</SectionTitle>
        <div className="room-message">
          <Avatar person={room.host} size={28} />
          <div>
            <strong>{personById(room.host).short}</strong>
            <p>
              {room.id === 'greenhouse'
                ? 'Pull up a chair. The tomatoes are growing, the music is good 🌱'
                : 'For anyone ending a shift, and one tiny person just beginning her story.'}
            </p>
          </div>
        </div>
        <div className="room-message">
          <Avatar person={room.people[1]} size={28} />
          <div>
            <strong>{personById(room.people[1]).short}</strong>
            <p>Just what I needed after this shift. Good to be here.</p>
          </div>
        </div>
        {messages.map((m, i) => (
          <div className="room-message" key={i}>
            <Avatar person={profile} size={28} />
            <div>
              <strong>{profile.name || 'You'}</strong>
              <p>{m}</p>
            </div>
          </div>
        ))}
        {joined && (
          <form className="reply-box" onSubmit={send}>
            <input
              aria-label="Message the room"
              placeholder="Say hello to the room…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton
              icon={Send}
              label="Send room message"
              type="submit"
              disabled={!message.trim()}
            />
          </form>
        )}
      </div>
      <div className="sheet-footer">
        <Button
          className="full-width"
          variant={joined ? 'secondary' : 'primary'}
          onClick={joined ? leave : join}
        >
          {joined ? (
            <>
              <Check size={16} />
              Listening together · Leave room
            </>
          ) : (
            <>
              <Headphones size={17} />
              Join the room
            </>
          )}
        </Button>
      </div>
    </Overlay>
  );
}

function EditProfile({ profile, setProfile, close, toast }) {
  const [draft, setDraft] = useState({ ...profile });
  const update = (key, v) => setDraft((p) => ({ ...p, [key]: v }));
  const toggle = (key, v) =>
    update(key, draft[key].includes(v) ? draft[key].filter((x) => x !== v) : [...draft[key], v]);
  return (
    <Overlay title="Your corner of the colony" onClose={close}>
      <div className="sheet-scroll">
        <div className="wizard-head">
          <h2>Always becoming.</h2>
          <p>A profile can grow with you.</p>
        </div>
        <Field label="Name">
          <input
            value={draft.name}
            onChange={(e) => update('name', e.target.value)}
            maxLength={50}
          />
        </Field>
        <Field label="Role">
          <input value={draft.role} onChange={(e) => update('role', e.target.value)} />
        </Field>
        <Field label="Habitat">
          <input value={draft.habitat} onChange={(e) => update('habitat', e.target.value)} />
        </Field>
        <Field label="Places you’ve called home">
          <input value={draft.homes} onChange={(e) => update('homes', e.target.value)} />
        </Field>
        <div className="selection-section">
          <h3>Heritages</h3>
          <div className="chips">
            {HERITAGES.map((h) => (
              <Chip
                key={h}
                selected={draft.heritages.includes(h)}
                onClick={() => toggle('heritages', h)}
              >
                {h}
              </Chip>
            ))}
          </div>
        </div>
        {draft.heritages.includes('Other / self-describe') && (
          <Field label="Heritage in your words">
            <input
              value={draft.customHeritage}
              onChange={(e) => update('customHeritage', e.target.value)}
            />
          </Field>
        )}
        <div className="selection-section">
          <h3>Languages</h3>
          <div className="chips">
            {LANGUAGES.map((l) => (
              <Chip
                key={l}
                selected={draft.languages.includes(l)}
                onClick={() => toggle('languages', l)}
              >
                {l}
              </Chip>
            ))}
          </div>
        </div>
        <div className="visibility-row">
          <div>
            <strong>Share cultural background</strong>
            <p>Heritages, languages, and home places.</p>
          </div>
          <button
            role="switch"
            aria-label="Share cultural background"
            aria-checked={draft.visible}
            className={cx('toggle', draft.visible && 'on')}
            onClick={() => update('visible', !draft.visible)}
          />
        </div>
      </div>
      <div className="sheet-footer">
        <Button
          className="full-width"
          disabled={!draft.name.trim() || !draft.role.trim() || !draft.habitat.trim()}
          onClick={() => {
            setProfile(draft);
            close();
            toast('Your profile feels a little more like you');
          }}
        >
          Save changes
          <Check size={16} />
        </Button>
      </div>
    </Overlay>
  );
}

function AylaCapsule({ count, onAdd }) {
  return (
    <div className="capsule">
      <div className="eyebrow gold">FUTURE · 2051</div>
      <LockKeyhole size={28} strokeWidth={1.3} />
      <h3>Songs for Ayla.</h3>
      <p>
        A time capsule for a girl who will
        <br />
        call the Moon her first home.
      </p>
      <p className="mt-16">
        Unlocks on her 18th birthday
        <br />
        22 August 2051
      </p>
      {count > 0 && (
        <span className="capsule-count">
          <Check size={12} />
          {count} of your songs, safely sealed
        </span>
      )}
      <Button
        variant="outline"
        className="full-width"
        onClick={onAdd}
      >
        <Plus size={14} />
        Leave a song for her future
      </Button>
    </div>
  );
}

export default function App() {
  const [onboarding, setOnboarding] = useState(0);
  const [frameScale, setFrameScale] = useState(1);
  useEffect(() => {
    const resize = () =>
      setFrameScale(Math.min(1, (window.innerHeight - 44) / 860, (window.innerWidth - 24) / 406));
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  const [profile, setProfile] = useState({
    id: 'you',
    name: '',
    role: 'Habitat Designer',
    habitat: 'Tranquility Module B',
    heritages: ['Canadian', 'Filipino'],
    languages: ['English'],
    homes: '',
    customHeritage: '',
    genres: [],
    homeSongs: [],
    visible: true,
    color: '#8ca9bf',
  });
  const [carry, setCarry] = useState({ song: SONGS[0], note: '' });
  const [connections, setConnections] = useState([]),
    [tab, setTab] = useState('Home'),
    [layers, setLayers] = useState([]),
    [toastMessage, setToastMessage] = useState(null);
  const [contribution, setContribution] = useState(null),
    [uploads, setUploads] = useState([]),
    [moments, setMoments] = useState([]),
    [capsules, setCapsules] = useState([]);
  const [current, setCurrent] = useState(null),
    [playing, setPlaying] = useState(false),
    [progress, setProgress] = useState(0),
    [queue, setQueue] = useState(SONGS.filter((s) => !s.pending)),
    [shuffle, setShuffle] = useState(false),
    [repeat, setRepeat] = useState(false),
    [favorites, setFavorites] = useState([]),
    [playlists, setPlaylists] = useState({
      'Quiet hours': [],
      'A little piece of home': [],
      Earthrise: [],
    });
  const [expanded, setExpanded] = useState(null),
    [reactions, setReactions] = useState({}),
    [replies, setReplies] = useState({});
  const [exploreQuery, setExploreQuery] = useState(''),
    [browseType, setBrowseType] = useState('Culture'),
    [browseFilter, setBrowseFilter] = useState('All'),
    [chronicleFilter, setChronicleFilter] = useState('All');
  const [joinedRooms, setJoinedRooms] = useState([]),
    [comms, setComms] = useState(false),
    [lastMoment, setLastMoment] = useState(null),
    [syncSeconds, setSyncSeconds] = useState(8072);
  const [shareQuery, setShareQuery] = useState(''),
    [sentShares, setSentShares] = useState([]);
  const toastTimer = useRef(null),
    commsTimer = useRef(null),
    mainScroll = useRef(null);
  const allSongs = [...SONGS, ...uploads];
  const active = layers[layers.length - 1];
  const displayProfile = {
    ...profile,
    short: profile.name.split(' ')[0] || 'You',
    heritages: profile.visible
      ? [
          ...profile.heritages.filter((h) => h !== 'Other / self-describe'),
          ...(profile.customHeritage ? [profile.customHeritage] : []),
        ]
      : [],
    languages: profile.visible ? profile.languages : [],
  };
  const toast = (message) => {
    setToastMessage(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 3400);
  };
  const open = (layer) => {
    setLayers((l) => [...l, layer]);
    if (layer.type === 'share') setShareQuery('');
  };
  const close = () => setLayers((l) => l.slice(0, -1));
  const navigate = (name) => {
    setTab(name);
    setLayers([]);
  };
  useEffect(() => {
    if (onboarding === null) return;
    const skipOnboarding = (event) => {
      if (
        event.key !== '1' ||
        event.repeat ||
        event.defaultPrevented ||
        event.isComposing ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      )
        return;
      const target = event.target;
      if (
        target instanceof Element &&
        (target.closest('input, textarea, select, [role="textbox"]') || target.isContentEditable)
      )
        return;
      event.preventDefault();
      setProfile((p) => ({ ...p, name: p.name.trim() || 'Alex Reyes' }));
      setLayers([]);
      setTab('Home');
      setOnboarding(null);
    };
    window.addEventListener('keydown', skipOnboarding);
    return () => window.removeEventListener('keydown', skipOnboarding);
  }, [onboarding]);
  useEffect(() => {
    mainScroll.current?.scrollTo(0, 0);
  }, [tab, onboarding]);
  useEffect(() => {
    const t = setInterval(() => setSyncSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => {
      clearInterval(t);
      clearTimeout(toastTimer.current);
      clearTimeout(commsTimer.current);
    };
  }, []);
  useEffect(() => {
    if (!playing || !current) return;
    const t = setInterval(() => setProgress((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [playing, current?.id]);
  useEffect(() => {
    if (!current || progress < current.duration) return;
    if (repeat) {
      setProgress(0);
      return;
    }
    nextSong();
  }, [progress, current?.id, repeat]);
  const play = (song, nextQueue) => {
    if (song.pending) {
      toast('Arriving in the next sync — your place is saved');
      open({ type: 'sync' });
      return;
    }
    if (nextQueue) setQueue(nextQueue.filter((s) => !s.pending));
    setCurrent(song);
    setProgress(0);
    setPlaying(true);
  };
  const nextSong = (back = false) => {
    if (!queue.length) return;
    if (back && progress > 3) {
      setProgress(0);
      return;
    }
    const index = queue.findIndex((s) => s.id === current?.id);
    const nextIndex =
      shuffle && !back && queue.length > 1
        ? (index + 1 + Math.floor(Math.random() * (queue.length - 1))) % queue.length
        : (index + (back ? -1 : 1) + queue.length) % queue.length;
    setCurrent(queue[nextIndex]);
    setProgress(0);
    setPlaying(true);
  };
  const togglePlay = () => (current ? setPlaying((p) => !p) : play(SONGS[0]));
  const connect = (id) => {
    const has = connections.includes(id);
    setConnections((c) => (has ? c.filter((x) => x !== id) : [...c, id]));
    toast(has ? 'Connection removed' : 'You and ' + personById(id).short + ' are connected');
  };
  const openPerson = (p) =>
    p.id === 'you' ? navigate('Profile') : open({ type: 'profile', person: p });
  const openCollection = (title, songs, description, eyebrow = 'A collection from the colony') =>
    open({ type: 'collection', title, songs, description, eyebrow });
  const openAdd = (song, capsule = false) => {
    if (!capsule && contribution) {
      toast('Your song is already in Week 34');
      navigate('Weekly');
      setExpanded(contribution.id);
      return;
    }
    open({ type: 'add', song, capsule });
  };
  const openRoom = (room) => open({ type: 'room', room });
  const joinRoom = (room) => {
    setJoinedRooms((r) => (r.includes(room.id) ? r : [...r, room.id]));
    play(
      SONGS[room.song],
      room.id === 'lullabies'
        ? SONGS.filter((s) => s.source === 'cradle')
        : SONGS.filter((s) => s.source === 'moon'),
    );
    toast('You’re listening with ' + room.name);
  };
  const openSpacewalk = () => {
    if (!current || !playing) play(SONGS[0], SONGS.slice(0, 13));
    setComms(false);
    setLastMoment(null);
    open({ type: 'spacewalk' });
  };
  const saveMoment = () => {
    const stamp = {
      id: 'moment-' + Date.now(),
      song: current || SONGS[0],
      time: '14:' + String(32 + Math.floor(progress / 60)).padStart(2, '0') + ' CST',
      date: '24 AUG 2033',
    };
    setMoments((m) => [...m, stamp]);
    setLastMoment(stamp);
    setPlaylists((p) => ({
      ...p,
      Earthrise: p.Earthrise.includes(stamp.song.id)
        ? p.Earthrise
        : [...p.Earthrise, stamp.song.id],
    }));
    toast('Moment saved · Added to Earthrise');
  };
  const simulateComms = () => {
    clearTimeout(commsTimer.current);
    setComms(true);
    commsTimer.current = setTimeout(() => {
      setComms(false);
      toast('Comms clear · Music restored');
    }, 8500);
  };
  const syncLabel =
    Math.floor(syncSeconds / 3600) +
    'h ' +
    String(Math.floor((syncSeconds % 3600) / 60)).padStart(2, '0') +
    'm';
  const weeklySongs = [...(contribution ? [contribution] : []), ...SONGS.slice(0, 13)];
  const cradle = SONGS.filter((s) => s.source === 'cradle');
  const monthSongs = SONGS.filter((s) => s.source === 'moon');
  const weeklyPerson = (s) =>
    s.contributor === 'you' ? displayProfile : personById(s.contributor);
  const cultureCount = new Set(weeklySongs.flatMap((s) => weeklyPerson(s)?.heritages || [])).size;
  const searchResults = allSongs
    .filter((s) => matches(s, exploreQuery))
    .filter((s) => {
      if (browseFilter === 'All') return true;
      if (browseType === 'Culture')
        return (
          (s.contributor === 'you'
            ? profile.heritages
            : personById(s.contributor)?.heritages || []
          ).includes(browseFilter) || (s.heritages || []).includes(browseFilter)
        );
      if (browseType === 'Language') return s.language === browseFilter;
      return {
        Grounded: ['Bossa Nova', 'Ambient', 'Classical', 'Andean Folk'],
        Together: ['Afrobeats', 'Cumbia', 'Jazz', 'Hip-Hop'],
        Dreaming: ['Enka', 'Brazilian Lullaby', 'Turkish Lullaby', 'Ambient'],
        Energized: ['Electronic', 'K-Pop', 'Anatolian Rock', 'Bollywood'],
      }[browseFilter]?.includes(s.genre);
    });
  const homeHeritageSongs = allSongs.filter((s) =>
    (personById(s.contributor)?.heritages || []).some((h) => profile.heritages.includes(h)),
  );
  const newCultureSongs = SONGS.filter(
    (s) =>
      !s.pending &&
      !(personById(s.contributor)?.heritages || []).some((h) => profile.heritages.includes(h)),
  ).slice(6, 11);
  const albumSection = (
    title,
    songs,
    action = 'View all',
    description = 'A few songs, and the worlds that made them.',
  ) => (
    <>
      <SectionTitle action={action} onClick={() => openCollection(title, songs, description)}>
        {title}
      </SectionTitle>
      <div className="horizontal">
        {songs.slice(0, 5).map((s) => (
          <button className="album-card" key={s.id} onClick={() => play(s, songs)}>
            <Art song={s} size={145} />
            <strong>{s.title}</strong>
            <span>{s.artist}</span>
            {s.pending && (
              <small>
                <Clock3 size={10} />
                Next Earth sync
              </small>
            )}
          </button>
        ))}
      </div>
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="stage" style={{ '--frame-scale': frameScale }}>
        <div className="desktop-mark">
          <Moon size={25} strokeWidth={1} className="gold" />
          <div>
            <span style={{ letterSpacing: 6, fontSize: 18 }}>LUNAR</span>
            <small>THE COLONY MUSIC NETWORK</small>
          </div>
        </div>
        <div className="desktop-coordinate">
          25.9° N / 0.0° E<br />
          TRANQUILITY COLONY · EST. 2033
        </div>
        <div className="desktop-caption">
          <span className="tiny-line" />
          <h2>
            Far from Earth.
            <br />
            Closer to each other.
          </h2>
          <p>
            A song from your world.
            <br />A connection in our new one.
          </p>
        </div>
        <div className="desktop-footer">ONE MOON. MANY WORLDS. — 2033</div>
        <div className="phone">
          <div className="device">
            <div className="status-bar" aria-hidden="true">
              <span>9:41</span>
              <div className="island" />
              <div className="status-icons">
                <Signal size={14} fill="currentColor" />
                <Wifi size={14} />
                <BatteryFull size={19} />
              </div>
            </div>
            <div
              className="app-body"
              inert={active ? true : undefined}
              aria-hidden={active ? true : undefined}
            >
              {onboarding !== null ? (
                <Onboarding
                  profile={profile}
                  setProfile={setProfile}
                  carry={carry}
                  setCarry={setCarry}
                  connections={connections}
                  toggleConnect={connect}
                  finish={() => {
                    setOnboarding(null);
                    setTab('Home');
                    toast('Welcome home, ' + profile.name.split(' ')[0]);
                  }}
                  toast={toast}
                  openRoom={openRoom}
                  step={onboarding}
                  setStep={setOnboarding}
                />
              ) : (
                <>
                  <main ref={mainScroll} className="scroll-view">
                    <div className="screen" key={tab}>
                      {tab === 'Home' && (
                        <>
                          <div className="home-top">
                            <div>
                              <div className="eyebrow">SHIFT 02 · 14:32 COLONY TIME</div>
                              <h1>Welcome home, {profile.name.split(' ')[0]}.</h1>
                              <div className="phase">
                                <Sunrise size={13} />
                                Longday · Day 9 of 15
                              </div>
                            </div>
                            <button
                              aria-label="Open your profile"
                              onClick={() => navigate('Profile')}
                            >
                              <Avatar person={profile} size={39} />
                            </button>
                          </div>
                          <div className="colony-strip">
                            <button onClick={() => open({ type: 'people' })}>
                              <strong>512</strong>
                              <span>COLONISTS</span>
                            </button>
                            <button onClick={() => open({ type: 'sync' })}>
                              <strong className="blue">{syncLabel}</strong>
                              <span>NEXT EARTH SYNC</span>
                            </button>
                            <button onClick={() => navigate('Weekly')}>
                              <strong>
                                {341 + (contribution ? 1 : 0)}
                                <span style={{ display: 'inline', fontSize: 11, color: '#778b9f' }}>
                                  {' '}
                                  / 512
                                </span>
                              </strong>
                              <span>STORIES THIS WEEK</span>
                            </button>
                          </div>
                          <section className="weekly-hero">
                            <div className="eyebrow">CONSORTIUM WEEKLY · 034</div>
                            <h2>
                              {contribution ? (
                                <>
                                  Your story is
                                  <br />
                                  part of ours.
                                </>
                              ) : (
                                <>
                                  What does your
                                  <br />
                                  childhood sound like?
                                </>
                              )}
                            </h2>
                            <p>
                              {contribution
                                ? 'A little piece of home, shared with the whole colony.'
                                : 'One song. A memory. A little piece of the world you brought with you.'}
                            </p>
                            <div className="row-between">
                              <Button
                                onClick={() => (contribution ? navigate('Weekly') : openAdd())}
                              >
                                {contribution ? (
                                  <>
                                    <Check size={13} />
                                    Your contribution
                                  </>
                                ) : (
                                  <>
                                    <Plus size={14} />
                                    Add your song
                                  </>
                                )}
                              </Button>
                              <AvatarStack people={['kenji', 'elif', 'amara']} size={27} />
                            </div>
                          </section>
                          <SectionTitle action="See all" onClick={() => open({ type: 'rooms' })}>
                            A little company
                          </SectionTitle>
                          <div className="room-list">
                            {ROOMS.map((room) => (
                              <div
                                className={cx('room-card', room.id === 'lullabies' && 'purple')}
                                key={room.id}
                              >
                                <div className="room-icon" style={{ color: room.color }}>
                                  <room.icon size={19} />
                                </div>
                                <h3>{room.name}</h3>
                                <p>
                                  <i className="live-dot" />
                                  {room.count + (joinedRooms.includes(room.id) ? 1 : 0)} listening
                                </p>
                                <div className="row-between">
                                  <AvatarStack people={room.people.slice(0, 2)} />
                                  <Button
                                    variant="secondary"
                                    className="btn-sm"
                                    onClick={() => openRoom(room)}
                                  >
                                    {joinedRooms.includes(room.id) ? 'Open' : 'Join'}
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <SectionTitle>Around the colony</SectionTitle>
                          <div className="activity-card">
                            <button
                              className="bg-transparent p-0 self-start"
                              aria-label="Meet Kenji"
                              onClick={() => openPerson(COLONISTS[0])}
                            >
                              <Avatar person="kenji" size={33} />
                            </button>
                            <div className="activity-copy">
                              <button
                                onClick={() => {
                                  navigate('Weekly');
                                  setExpanded(SONGS[0].id);
                                }}
                              >
                                <strong>Kenji</strong> added a little piece of home
                                <br />
                                to the <strong>Weekly</strong>
                                <blockquote>
                                  “My grandmother sang this in São Paulo. Now I sing it to Ayla.”
                                </blockquote>
                              </button>
                              <small>12 minutes ago · 18 hearts</small>
                            </div>
                          </div>
                          <AylaCapsule count={capsules.length} onAdd={() => openAdd(null, true)} />
                        </>
                      )}
                      {tab === 'Weekly' && (
                        <>
                          <header className="page-top">
                            <div className="eyebrow gold">ONE COLONY. ONE PLAYLIST.</div>
                            <h1>
                              Consortium Weekly
                              <span className="block text-[13px] tracking-normal text-slate-400 mt-2">
                                Week 34
                              </span>
                            </h1>
                          </header>
                          <div className="weekly-cover">
                            <div className="eyebrow">THIS WEEK’S THEME</div>
                            <h2>
                              A song from
                              <br />
                              your childhood.
                            </h2>
                            <p>Before we shared a Moon, we had our own worlds.</p>
                          </div>
                          <div className="row-between">
                            <span className="small-copy flex items-center gap-1.5">
                              <Clock3 size={12} />
                              Next Weekly in 3d 09h
                            </span>
                            <span className="text-[9px] gold">34th chapter</span>
                          </div>
                          <div className="weekly-meta">
                            <span>
                              <Users size={12} />
                              {341 + (contribution ? 1 : 0)} contributors
                            </span>
                            <span>
                              <Globe2 size={12} />
                              38 cultures
                            </span>
                            <span>19h 42m</span>
                          </div>
                          <div className="weekly-actions">
                            <Button
                              onClick={() =>
                                play(
                                  weeklySongs.find((s) => !s.pending),
                                  weeklySongs,
                                )
                              }
                            >
                              <Play size={14} fill="currentColor" />
                              Play all
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() =>
                                contribution ? setExpanded(contribution.id) : openAdd()
                              }
                            >
                              {contribution ? <Check size={14} /> : <Plus size={14} />}{' '}
                              {contribution ? 'Your song' : 'Add your song'}
                            </Button>
                          </div>
                          <p className="inline-note">
                            Playing across habitats, common spaces, and the next spacewalk.
                          </p>
                          <SectionTitle>
                            {weeklySongs.length} featured stories this week
                          </SectionTitle>
                          {weeklySongs.map((s) => (
                            <WeeklyTrack
                              key={s.id}
                              song={s}
                              person={weeklyPerson(s)}
                              play={(song) => play(song, weeklySongs)}
                              current={current?.id === s.id && playing}
                              openPerson={openPerson}
                              toast={toast}
                              reactions={reactions}
                              setReactions={setReactions}
                              replies={replies}
                              setReplies={setReplies}
                              expanded={expanded}
                              setExpanded={setExpanded}
                            />
                          ))}
                          <p className="end-note">
                            A playlist made by all of us.
                            <br />
                            Every note is a small invitation.
                          </p>
                        </>
                      )}
                      {tab === 'Explore' && (
                        <>
                          <header className="page-top">
                            <div className="eyebrow gold">A WORLD OF SOUND</div>
                            <h1>Find your next orbit.</h1>
                          </header>
                          <SearchBox value={exploreQuery} onChange={setExploreQuery} />
                          <div className="explore-tabs" role="tablist" aria-label="Browse music by">
                            {['Culture', 'Language', 'Mood'].map((t) => (
                              <button
                                key={t}
                                role="tab"
                                aria-selected={browseType === t}
                                className={browseType === t ? 'active' : ''}
                                onClick={() => {
                                  setBrowseType(t);
                                  setBrowseFilter('All');
                                }}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                          <div className="chips browse-chips">
                            {[
                              'All',
                              ...(browseType === 'Culture'
                                ? HERITAGES.filter((h) => h !== 'Other / self-describe')
                                : browseType === 'Language'
                                  ? LANGUAGES
                                  : ['Grounded', 'Together', 'Dreaming', 'Energized']),
                            ].map((f) => (
                              <Chip
                                key={f}
                                selected={browseFilter === f}
                                onClick={() => setBrowseFilter(f)}
                              >
                                {f}
                              </Chip>
                            ))}
                          </div>
                          {exploreQuery || browseFilter !== 'All' ? (
                            <>
                              <SectionTitle>{searchResults.length} sounds to discover</SectionTitle>
                              {searchResults.length ? (
                                searchResults.map((s) => (
                                  <SongRow
                                    key={s.id}
                                    song={s}
                                    onClick={() => play(s, searchResults)}
                                    current={current?.id === s.id && playing}
                                  />
                                ))
                              ) : (
                                <Empty title="A new sound is still out there">
                                  Try a broader search or choose another culture, language, or mood.
                                </Empty>
                              )}
                            </>
                          ) : (
                            <>
                              {albumSection(
                                'New from Earth',
                                [SONGS[22], SONGS[23], SONGS[24], SONGS[25]],
                                'Sync info',
                                'Your next discoveries are crossing the distance. Songs marked for sync are not playable yet.',
                              )}
                              <button
                                className="sync-note full-width text-left"
                                onClick={() => open({ type: 'sync' })}
                              >
                                <EarthIcon size={15} />
                                <span>
                                  Next Earth sync in{' '}
                                  <strong className="text-blue-200 font-medium">{syncLabel}</strong>
                                </span>
                                <ChevronRight size={14} className="ml-auto" />
                              </button>
                              {albumSection('Made on the Moon', [
                                ...uploads.filter((s) => s.visibility !== 'Private'),
                                ...monthSongs,
                              ])}
                              {albumSection(
                                'From your heritages',
                                homeHeritageSongs.length
                                  ? homeHeritageSongs
                                  : [SONGS[27], SONGS[0]],
                                'Explore',
                                'Familiar threads from the places that shaped you.',
                              )}
                              {albumSection(
                                'Cultures you haven’t heard yet',
                                newCultureSongs.length ? newCultureSongs : SONGS.slice(8, 12),
                              )}
                              {albumSection(
                                'Lullabies for the Cradle',
                                cradle,
                                'For Ayla',
                                'From Japanese, Brazilian, and Turkish traditions, with love for our first Moonese.',
                              )}
                            </>
                          )}
                          <button
                            className="upload-banner"
                            onClick={() => open({ type: 'create' })}
                          >
                            <AudioLines size={25} className="blue" />
                            <div>
                              <strong>What does the Moon sound like to you?</strong>
                              <p>Upload your music. Add to our world.</p>
                            </div>
                            <Plus size={17} />
                          </button>
                        </>
                      )}
                      {tab === 'Chronicle' && (
                        <>
                          <header className="page-top">
                            <div className="eyebrow gold">WE WERE HERE. WE LISTENED.</div>
                            <h1>Our little history.</h1>
                            <p className="subtitle">
                              A colony becoming a home, one song at a time.
                            </p>
                          </header>
                          <div className="chips browse-chips" aria-label="Chronicle filters">
                            {['All', 'Milestones', 'Weeklies', 'Earthrise moments'].map((f) => (
                              <Chip
                                key={f}
                                selected={chronicleFilter === f}
                                onClick={() => setChronicleFilter(f)}
                              >
                                {f}
                              </Chip>
                            ))}
                          </div>
                          <div className="row-between mt-24">
                            <span className="eyebrow gold">2033</span>
                            <span className="text-[9px] text-slate-500">OUR FIRST YEAR</span>
                          </div>
                          <div className="timeline">
                            {(chronicleFilter === 'All' || chronicleFilter === 'Milestones') && (
                              <>
                                <div className="timeline-item milestone">
                                  <time>03 MARCH</time>
                                  <h3>First Landing</h3>
                                  <p>500 colonists. One extraordinary beginning.</p>
                                  <button
                                    className="timeline-playlist"
                                    onClick={() =>
                                      openCollection(
                                        'First Landing',
                                        SONGS.slice(0, 6),
                                        'The songs 500 people carried across the distance. Our first day, kept in music.',
                                        '03 MAR 2033 · 500 COLONISTS',
                                      )
                                    }
                                  >
                                    <Rocket size={25} className="gold" />
                                    <span>
                                      <strong>The songs we carried</strong>
                                      <small>500 colonists · 42 cultures</small>
                                    </span>
                                    <Play size={15} />
                                  </button>
                                </div>
                                <div className="timeline-item milestone">
                                  <time>18 MAY</time>
                                  <h3>First Greenhouse Harvest</h3>
                                  <p>506 colonists · The first taste of something grown here.</p>
                                  <button
                                    className="timeline-playlist"
                                    onClick={() =>
                                      openCollection(
                                        'Our first harvest',
                                        [SONGS[16], SONGS[7], SONGS[29]],
                                        'We grew dinner. Then we danced.',
                                        '18 MAY 2033 · 506 COLONISTS',
                                      )
                                    }
                                  >
                                    <Sprout size={25} style={{ color: '#9fbd97' }} />
                                    <span>
                                      <strong>For things that grow</strong>
                                      <small>Oxygen Garden + 11 more</small>
                                    </span>
                                    <Play size={15} />
                                  </button>
                                </div>
                              </>
                            )}
                            {(chronicleFilter === 'All' ||
                              chronicleFilter === 'Earthrise moments') && (
                              <div className="timeline-item">
                                <time>08 JUNE</time>
                                <h3>First Earthrise Playlist</h3>
                                <p>508 colonists · We all stopped for a moment.</p>
                                <button
                                  className="timeline-image full-width text-left"
                                  onClick={() =>
                                    openCollection(
                                      'Earthrise',
                                      [SONGS[28], SONGS[20], ...moments.map((m) => m.song)],
                                      'The music we were hearing when we looked back home.',
                                      'MOMENTS WE KEPT',
                                    )
                                  }
                                >
                                  <Earth />
                                  <span>
                                    THERE YOU ARE.
                                    <br />
                                    384,400 km away.
                                  </span>
                                </button>
                                <button className="text-action" onClick={() => play(SONGS[28])}>
                                  <Play size={12} />
                                  Between Two Skies · Mateo Rojas
                                </button>
                              </div>
                            )}
                            {(chronicleFilter === 'All' || chronicleFilter === 'Weeklies') && (
                              <>
                                {[32, 33].map((w, i) => (
                                  <div className="timeline-item" key={w}>
                                    <time>{i ? '15' : '08'} AUGUST</time>
                                    <h3>
                                      Weekly {w} · {i ? 'A place I miss' : 'New beginnings'}
                                    </h3>
                                    <p>
                                      {i ? 35 : 32} cultures · {i ? 328 : 312} stories shared
                                    </p>
                                    <button
                                      className="timeline-playlist"
                                      onClick={() =>
                                        openCollection(
                                          'Consortium Weekly ' + w,
                                          SONGS.slice(i * 3 + 3, i * 3 + 7),
                                          i
                                            ? 'The places that shaped us, even from here.'
                                            : 'Songs for learning to begin again.',
                                        )
                                      }
                                    >
                                      <Art song={SONGS[i * 3 + 3]} size={38} />
                                      <span>
                                        <strong>{SONGS[i * 3 + 3].title}</strong>
                                        <small>{SONGS[i * 3 + 3].artist} + colony favorites</small>
                                      </span>
                                      <Play size={13} />
                                    </button>
                                  </div>
                                ))}
                              </>
                            )}
                            {(chronicleFilter === 'All' || chronicleFilter === 'Milestones') && (
                              <div className="timeline-item milestone">
                                <time>22 AUGUST</time>
                                <h3>
                                  Ayla, the first
                                  <br />
                                  Moonese, is born.
                                </h3>
                                <p>512 colonists · One brand-new kind of home.</p>
                                <button
                                  className="timeline-playlist"
                                  onClick={() =>
                                    openCollection(
                                      'The Cradle',
                                      cradle,
                                      'Kenji and Elif’s daughter arrived into a world that is already singing to her.',
                                      'FOR AYLA · OUR FIRST MOONESE',
                                    )
                                  }
                                >
                                  <Baby size={26} className="gold" />
                                  <span>
                                    <strong>Welcome to the world, little one.</strong>
                                    <small>Japanese · Brazilian · Turkish lullabies</small>
                                  </span>
                                  <Play size={14} />
                                </button>
                              </div>
                            )}
                            {(chronicleFilter === 'All' || chronicleFilter === 'Weeklies') && (
                              <div className="timeline-item">
                                <time>THIS WEEK · 24 AUGUST</time>
                                <h3>Weekly 34 · Our childhoods</h3>
                                <p>
                                  38 cultures · {341 + (contribution ? 1 : 0)} stories, and counting
                                </p>
                                <button
                                  className="timeline-playlist"
                                  onClick={() => navigate('Weekly')}
                                >
                                  <Art song={contribution || SONGS[0]} size={38} />
                                  <span>
                                    <strong>
                                      {contribution ? contribution.title : 'Windows of São Paulo'}
                                    </strong>
                                    <small>
                                      {contribution
                                        ? 'Your story is here, too.'
                                        : 'A little piece of where we began.'}
                                    </small>
                                  </span>
                                  <ChevronRight size={15} />
                                </button>
                              </div>
                            )}
                            {(chronicleFilter === 'All' ||
                              chronicleFilter === 'Earthrise moments') &&
                              moments.map((m) => (
                                <div className="timeline-item" key={m.id}>
                                  <time>
                                    {m.date} · {m.time}
                                  </time>
                                  <h3>Your Earthrise moment</h3>
                                  <p>A moment outside, kept forever.</p>
                                  <button
                                    className="timeline-playlist"
                                    onClick={() => play(m.song)}
                                  >
                                    <Art song={m.song} size={38} />
                                    <span>
                                      <strong>{m.song.title}</strong>
                                      <small>Saved by {profile.name}</small>
                                    </span>
                                    <Play size={14} />
                                  </button>
                                </div>
                              ))}
                          </div>
                          <AylaCapsule count={capsules.length} onAdd={() => openAdd(null, true)} />
                          <p className="end-note">Every song shared becomes part of our history.</p>
                        </>
                      )}
                      {tab === 'Profile' && (
                        <>
                          <div className="row-between">
                            <span className="eyebrow gold">YOUR PLACE IN THE COLONY</span>
                            <IconButton
                              icon={CircleHelp}
                              label="About Lunar"
                              onClick={() => open({ type: 'about' })}
                            />
                          </div>
                          <ProfileView
                            person={profile}
                            own
                            carry={carry}
                            connections={connections}
                            contribution={contribution}
                            uploads={uploads}
                            moments={moments}
                            cultures={profile.visible ? profile.heritages.length : 1}
                            play={play}
                            openPerson={openPerson}
                            edit={() => open({ type: 'edit' })}
                            restart={() => {
                              setOnboarding(0);
                              setLayers([]);
                              setPlaying(false);
                              toast('Onboarding restarted · Your colony stories are still here');
                            }}
                            toggleConnect={connect}
                          />
                          {Object.values(playlists).some((s) => s.length > 0) && (
                            <>
                              <SectionTitle>Your playlists</SectionTitle>
                              {Object.entries(playlists)
                                .filter(([, ids]) => ids.length)
                                .map(([name, ids]) => (
                                  <button
                                    key={name}
                                    className="timeline-playlist"
                                    onClick={() =>
                                      openCollection(
                                        name,
                                        ids
                                          .map((id) =>
                                            [...allSongs, ...weeklySongs].find((s) => s.id === id),
                                          )
                                          .filter(Boolean),
                                        'The sounds you wanted to keep close.',
                                      )
                                    }
                                  >
                                    <Music2 size={21} className="blue" />
                                    <span>
                                      <strong>{name}</strong>
                                      <small>
                                        {ids.length} saved {ids.length === 1 ? 'song' : 'songs'}
                                      </small>
                                    </span>
                                    <ChevronRight size={14} />
                                  </button>
                                ))}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </main>
                  <div className="bottom-area">
                    {current && (
                      <div className="mini-player">
                        <button
                          className="mini-info"
                          onClick={() => open({ type: 'player' })}
                          aria-label={'Now playing: ' + current.title}
                        >
                          <Art song={current} size={37} />
                          <span>
                            <strong>{current.title}</strong>
                            <small>
                              {current.artist}
                              {comms ? ' · Music lowered' : ''}
                            </small>
                          </span>
                        </button>
                        <IconButton
                          icon={playing ? Pause : Play}
                          label={playing ? 'Pause playback' : 'Resume playback'}
                          onClick={togglePlay}
                        />
                        <IconButton
                          icon={SkipForward}
                          label="Next track"
                          onClick={() => nextSong()}
                        />
                        <div
                          className="mini-progress"
                          style={{ width: (progress / current.duration) * 100 + '%' }}
                        />
                      </div>
                    )}
                    <nav className="tab-bar" aria-label="Main navigation">
                      {[
                        [Home, 'Home'],
                        [Disc3, 'Weekly'],
                        [Compass, 'Explore'],
                        [Clock3, 'Chronicle'],
                        [UserRound, 'Profile'],
                      ].map(([Icon, name]) => (
                        <button
                          key={name}
                          className={tab === name ? 'active' : ''}
                          onClick={() => navigate(name)}
                          aria-current={tab === name ? 'page' : undefined}
                        >
                          <Icon size={20} strokeWidth={1.65} />
                          <span>{name}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                </>
              )}
            </div>
            <div className="home-indicator" />
            {active?.type === 'add' && (
              <AddWeekly
                initialSong={active.song}
                completed={active.complete}
                songs={allSongs}
                profile={profile}
                capsule={active.capsule}
                onClose={close}
                toast={toast}
                onShare={(song) => open({ type: 'share', song })}
                onPublish={(s) => {
                  setLayers((l) =>
                    l.map((layer) =>
                      layer === active ? { ...layer, complete: true, song: s } : layer,
                    ),
                  );
                  if (active.capsule) {
                    setCapsules((c) => [...c, s]);
                    toast('Sealed in Songs for Ayla');
                  } else {
                    setContribution(s);
                    toast('Added to the Weekly');
                  }
                }}
              />
            )}
            {active?.type === 'create' && (
              <CreateMusic
                onClose={close}
                toast={toast}
                onPublish={(s) => {
                  setUploads((u) => [{ ...s, artist: profile.name }, ...u]);
                  toast(
                    s.visibility === 'Private'
                      ? 'Saved to your private uploads'
                      : 'Published in Made on the Moon',
                  );
                }}
              />
            )}
            {active?.type === 'edit' && (
              <EditProfile profile={profile} setProfile={setProfile} close={close} toast={toast} />
            )}
            {active?.type === 'profile' && (
              <Overlay title="Meet a fellow colonist" onClose={close}>
                <div className="sheet-scroll">
                  <ProfileView
                    person={active.person}
                    carry={{
                      song: SONGS.find((s) => s.contributor === active.person.id),
                      note:
                        SONGS.find((s) => s.contributor === active.person.id).translation ||
                        SONGS.find((s) => s.contributor === active.person.id).note,
                    }}
                    connections={connections}
                    uploads={SONGS.filter(
                      (s) => s.contributor === active.person.id && s.source === 'moon',
                    )}
                    play={play}
                    toggleConnect={connect}
                  />
                </div>
              </Overlay>
            )}
            {active?.type === 'room' && (
              <Room
                key={active.room.id}
                room={active.room}
                joined={joinedRooms.includes(active.room.id)}
                join={() => joinRoom(active.room)}
                leave={() => {
                  setJoinedRooms((r) => r.filter((id) => id !== active.room.id));
                  toast('You left the room · The music is still with you');
                }}
                close={close}
                play={play}
                playing={playing}
                currentSong={current}
                onToggle={togglePlay}
                toast={toast}
                profile={profile}
              />
            )}
            {active?.type === 'rooms' && (
              <Overlay title="Listening rooms · Live on the Moon" onClose={close}>
                <div className="sheet-scroll">
                  <div className="wizard-head">
                    <h2>
                      Good music.
                      <br />
                      Better company.
                    </h2>
                    <p>Same song. Same moment. No Earth delay.</p>
                  </div>
                  {ROOMS.map((room) => (
                    <div className="room-card mb-16" key={room.id}>
                      <div className="person-row">
                        <div className="room-icon">
                          <room.icon size={20} />
                        </div>
                        <div>
                          <h3>{room.name}</h3>
                          <p>
                            {room.count + (joinedRooms.includes(room.id) ? 1 : 0)} listening ·
                            Hosted by {personById(room.host).short}
                          </p>
                        </div>
                      </div>
                      <div className="row-between">
                        <AvatarStack people={room.people} />
                        <Button className="btn-sm" onClick={() => openRoom(room)}>
                          Join the room
                          <ArrowRight size={12} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Overlay>
            )}
            {active?.type === 'collection' && (
              <Overlay title={active.eyebrow} onClose={close}>
                <div className="sheet-scroll">
                  <div className="wizard-head">
                    <h2>{active.title}</h2>
                    <p>{active.description}</p>
                  </div>
                  {active.title === 'The Cradle' && (
                    <div className="ayla-card mb-16" style={{ marginTop: 0 }}>
                      <div className="eyebrow">A NEW CHAPTER</div>
                      <h3>One baby. So many worlds.</h3>
                      <p>
                        Ayla’s father, Kenji, is Japanese Brazilian. Her mother, Elif, is Turkish.
                        Her first home is here.
                      </p>
                      <div className="flex items-center gap-2 mt-4">
                        <AvatarStack people={['kenji', 'elif']} size={31} />
                        <button
                          className="text-action gold"
                          onClick={() => openPerson(COLONISTS[1])}
                        >
                          Meet her family
                          <ArrowUpRight size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="row-between mb-16">
                    <span className="small-copy">
                      {active.songs.length} songs ·{' '}
                      {Math.round(active.songs.reduce((a, s) => a + s.duration, 0) / 60)} min
                    </span>
                    <Button
                      className="btn-sm"
                      disabled={!active.songs.some((s) => !s.pending)}
                      onClick={() =>
                        play(
                          active.songs.find((s) => !s.pending),
                          active.songs,
                        )
                      }
                    >
                      <Play size={13} fill="currentColor" />
                      Play all
                    </Button>
                  </div>
                  {active.songs.map((s, i) => (
                    <div key={s.id + '-' + i}>
                      <SongRow
                        song={s}
                        onClick={() => play(s, active.songs)}
                        current={current?.id === s.id && playing}
                      />
                      <p className="small-copy mt-16 mb-16">“{s.translation || s.note}”</p>
                    </div>
                  ))}
                  {!active.songs.length && (
                    <Empty title="A playlist waiting for its first moment">
                      Save an Earthrise moment on your next spacewalk.
                    </Empty>
                  )}
                </div>
              </Overlay>
            )}
            {active?.type === 'player' && current && (
              <Overlay
                title="Now playing · Here on the Moon"
                onClose={close}
                full
                className="now-playing"
              >
                <div className="sheet-scroll">
                  <Art song={current} size={320} className="now-art" />
                  <div className="row-between now-title">
                    <div>
                      <h2>{current.title}</h2>
                      <p>{current.artist}</p>
                    </div>
                    <IconButton
                      icon={Heart}
                      label={
                        favorites.includes(current.id)
                          ? 'Remove from favorites'
                          : 'Save to favorites'
                      }
                      className={favorites.includes(current.id) ? 'gold' : ''}
                      onClick={() => {
                        const saved = favorites.includes(current.id);
                        setFavorites((f) =>
                          saved ? f.filter((x) => x !== current.id) : [...f, current.id],
                        );
                        setPlaylists((p) => ({
                          ...p,
                          'A little piece of home': saved
                            ? p['A little piece of home'].filter((id) => id !== current.id)
                            : [...new Set([...p['A little piece of home'], current.id])],
                        }));
                        toast(saved ? 'Removed from favorites' : 'Saved to A little piece of home');
                      }}
                    />
                  </div>
                  <div className="mt-24">
                    <input
                      className="progress-range"
                      type="range"
                      min={0}
                      max={current.duration}
                      value={Math.min(progress, current.duration)}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      aria-label="Playback position"
                      style={{
                        background:
                          'linear-gradient(to right,#acd4ff ' +
                          Math.min((progress / current.duration) * 100, 100) +
                          '%,#3b4654 ' +
                          Math.min((progress / current.duration) * 100, 100) +
                          '%)',
                      }}
                    />
                    <div className="progress-times">
                      <span>{time(progress)}</span>
                      <span>{time(current.duration)}</span>
                    </div>
                  </div>
                  <div className="player-controls">
                    <IconButton
                      icon={Shuffle}
                      label={shuffle ? 'Disable shuffle' : 'Enable shuffle'}
                      className={shuffle ? 'active' : ''}
                      onClick={() => {
                        setShuffle((s) => !s);
                        toast(shuffle ? 'Shuffle off' : 'Shuffle on');
                      }}
                    />
                    <IconButton
                      icon={SkipBack}
                      label="Previous song"
                      onClick={() => nextSong(true)}
                    />
                    <button
                      className="big-play"
                      aria-label={playing ? 'Pause' : 'Play'}
                      onClick={togglePlay}
                    >
                      {playing ? (
                        <Pause size={25} fill="currentColor" />
                      ) : (
                        <Play size={25} fill="currentColor" />
                      )}
                    </button>
                    <IconButton icon={SkipForward} label="Next song" onClick={() => nextSong()} />
                    <IconButton
                      icon={Repeat2}
                      label={repeat ? 'Disable repeat' : 'Repeat this song'}
                      className={repeat ? 'active' : ''}
                      onClick={() => {
                        setRepeat((r) => !r);
                        toast(repeat ? 'Repeat off' : 'Repeating this song');
                      }}
                    />
                  </div>
                  <div className="flex justify-center items-center gap-1.5 text-[9px] text-slate-500">
                    <ShieldCheck size={11} />
                    Playing from our colony library
                  </div>
                  <div className="added-card">
                    <div className="person-row">
                      <Avatar person={weeklyPerson(current)} size={31} />
                      <div>
                        <strong>Added by {weeklyPerson(current).short}</strong>
                        <p>{weeklyPerson(current).heritages.join(' · ') || 'A fellow colonist'}</p>
                      </div>
                      <IconButton
                        icon={ArrowUpRight}
                        label="Meet the contributor"
                        onClick={() => openPerson(weeklyPerson(current))}
                      />
                    </div>
                    <p>“{current.translation || current.note}”</p>
                  </div>
                  <div className="now-listeners">
                    <AvatarStack people={['maya', 'imani', 'kenji']} size={25} />
                    <span>You + 18 colonists, sharing a moment</span>
                  </div>
                  <div className="player-actions">
                    <button onClick={() => open({ type: 'save', song: current })}>
                      <Plus size={19} />
                      Add to playlist
                    </button>
                    <button onClick={() => open({ type: 'share', song: current })}>
                      <Send size={18} />
                      Send to a colonist
                    </button>
                    <button onClick={() => openAdd(current)}>
                      <Disc3 size={19} />
                      Add to Weekly
                    </button>
                  </div>
                </div>
              </Overlay>
            )}
            {active?.type === 'spacewalk' && (
              <Overlay
                title="LUNAR / EVA 034"
                onClose={() => {
                  setComms(false);
                  clearTimeout(commsTimer.current);
                  close();
                }}
                full
                className="hud"
              >
                <div className="hud-content">
                  <div className="hud-top">
                    <div>
                      <span>CREW CHANNEL 03</span>
                      <strong>Crew is listening together</strong>
                    </div>
                    <AvatarStack people={['kenji', 'amara', 'arjun']} size={28} />
                  </div>
                  <Earth className="hud-earth" />
                  <div className="hud-track">
                    <div className="eyebrow">SOUNDTRACK / CONSORTIUM WEEKLY</div>
                    <h2>{current?.title || SONGS[0].title}</h2>
                    <p>{current?.artist || SONGS[0].artist}</p>
                  </div>
                  <div className="mt-24">
                    <input
                      className="progress-range"
                      type="range"
                      aria-label="Spacewalk playback position"
                      value={progress}
                      min={0}
                      max={current?.duration || 224}
                      onChange={(e) => setProgress(Number(e.target.value))}
                    />
                    <div className="progress-times">
                      <span>{time(progress)}</span>
                      <span>{time(current?.duration || 224)}</span>
                    </div>
                  </div>
                  <div className="hud-controls">
                    <button aria-label="Previous spacewalk song" onClick={() => nextSong(true)}>
                      <SkipBack size={28} />
                    </button>
                    <button
                      aria-label={playing ? 'Pause spacewalk music' : 'Play spacewalk music'}
                      onClick={togglePlay}
                    >
                      {playing ? (
                        <Pause size={31} fill="currentColor" />
                      ) : (
                        <Play size={31} fill="currentColor" />
                      )}
                    </button>
                    <button aria-label="Next spacewalk song" onClick={() => nextSong()}>
                      <SkipForward size={28} />
                    </button>
                  </div>
                  <div className="hud-voice">
                    <Mic size={13} />
                    VOICE CONTROLS ACTIVE
                  </div>
                  <p className="hud-command">
                    “Next song” · “Save this moment”
                    <span className="block mt-1 opacity-60">
                      Voice demo · use the controls to simulate commands
                    </span>
                  </p>
                  <button className={cx('hud-comms', comms && 'active')} onClick={simulateComms}>
                    {comms ? <VolumeX size={19} /> : <Radio size={19} />}{' '}
                    {comms ? 'Comms active — music lowered' : 'Simulate comms'}
                    {comms && <span className="text-[9px]">20%</span>}
                  </button>
                  <button className="hud-save" onClick={saveMoment}>
                    <Sunrise size={19} />
                    Save this moment
                  </button>
                  {lastMoment && (
                    <div className="saved-moment" role="status">
                      <Earth />
                      <div>
                        <h3>Earthrise moment saved</h3>
                        <p>
                          {lastMoment.song.title}
                          <br />
                          {lastMoment.time} · Added to Earthrise
                        </p>
                      </div>
                    </div>
                  )}
                  <p className="hud-inside">
                    <Headphones size={12} />8 colonists listening along from inside
                  </p>
                  <Button
                    variant="ghost"
                    className="full-width mt-16"
                    onClick={() => {
                      setComms(false);
                      clearTimeout(commsTimer.current);
                      close();
                    }}
                  >
                    <ArrowLeft size={14} />
                    Exit Spacewalk Mode
                  </Button>
                </div>
              </Overlay>
            )}
            {active?.type === 'share' && (
              <Overlay title="A song is better shared" onClose={close}>
                <div className="sheet-scroll">
                  <div className="wizard-head">
                    <h2>
                      “This made me
                      <br />
                      think of you.”
                    </h2>
                    <p>Send {active.song.title} to someone in the colony.</p>
                  </div>
                  <SearchBox
                    value={shareQuery}
                    onChange={setShareQuery}
                    placeholder="Find a colonist"
                  />
                  {COLONISTS.filter((p) =>
                    p.name.toLowerCase().includes(shareQuery.toLowerCase()),
                  ).map((p) => {
                    const sent = sentShares.includes(active.song.id + '-' + p.id);
                    return (
                      <div className="share-row" key={p.id}>
                        <Avatar person={p} size={39} />
                        <div>
                          <strong>{p.name}</strong>
                          <p>{p.role}</p>
                        </div>
                        <Button
                          variant={sent ? 'secondary' : 'primary'}
                          className="btn-sm"
                          disabled={sent}
                          onClick={() => {
                            setSentShares((s) => [...s, active.song.id + '-' + p.id]);
                            toast('Shared with ' + p.short + ' · Delivered instantly');
                          }}
                        >
                          {sent ? <Check size={14} /> : <Send size={13} />} {sent ? 'Sent' : 'Send'}
                        </Button>
                      </div>
                    );
                  })}
                  {!COLONISTS.some((p) =>
                    p.name.toLowerCase().includes(shareQuery.toLowerCase()),
                  ) && <Empty title="No colonist found">Try a first name or surname.</Empty>}
                  <p className="end-note">Across a habitat or across the colony. Instantly.</p>
                </div>
              </Overlay>
            )}
            {active?.type === 'save' && (
              <Overlay title="Keep it close" onClose={close}>
                <div className="sheet-scroll">
                  <div className="wizard-head">
                    <h2>A place for this song.</h2>
                    <p>
                      {active.song.title} · {active.song.artist}
                    </p>
                  </div>
                  {Object.entries(playlists).map(([name, ids]) => (
                    <div className="share-row" key={name}>
                      <span className="room-icon">
                        <Music2 size={20} />
                      </span>
                      <div>
                        <strong>{name}</strong>
                        <p>
                          {ids.length} {ids.length === 1 ? 'song' : 'songs'}
                        </p>
                      </div>
                      <Button
                        variant="secondary"
                        className="btn-sm"
                        onClick={() => {
                          const saved = ids.includes(active.song.id);
                          setPlaylists((p) => ({
                            ...p,
                            [name]: saved
                              ? p[name].filter((id) => id !== active.song.id)
                              : [...p[name], active.song.id],
                          }));
                          toast(saved ? 'Removed from ' + name : 'Added to ' + name);
                        }}
                      >
                        {ids.includes(active.song.id) ? <Check size={15} /> : <Plus size={15} />}{' '}
                        {ids.includes(active.song.id) ? 'Saved' : 'Add'}
                      </Button>
                    </div>
                  ))}
                  <p className="end-note">Your saved playlists live in your profile.</p>
                </div>
              </Overlay>
            )}
            {active?.type === 'people' && (
              <Overlay title="512 people. One shared home." onClose={close}>
                <div className="sheet-scroll">
                  <div className="wizard-head">
                    <h2>Meet your neighbors.</h2>
                    <p>13 voices from across the colony. Start with hello.</p>
                  </div>
                  {COLONISTS.map((p) => (
                    <button
                      className="share-row bg-transparent w-full text-left"
                      key={p.id}
                      onClick={() => openPerson(p)}
                    >
                      <Avatar person={p} size={41} />
                      <div>
                        <strong>{p.name}</strong>
                        <p>
                          {p.role} · {p.heritages.join(' / ')}
                        </p>
                      </div>
                      <ChevronRight size={15} />
                    </button>
                  ))}
                </div>
              </Overlay>
            )}
            {active?.type === 'sync' && (
              <Overlay title="Across the distance" onClose={close}>
                <div className="sheet-scroll">
                  <div className="sync-orbit">
                    <Earth />
                    <span>· · · · ·</span>
                    <div className="sync-moon" />
                  </div>
                  <div className="wizard-head">
                    <h2>
                      Earth is far.
                      <br />
                      Your music is here.
                    </h2>
                    <p>
                      Our library lives on the colony server, ready whenever you are. New sounds
                      arrive in scheduled sync windows.
                    </p>
                  </div>
                  <div className="sync-details">
                    <span>Next Earth sync</span>
                    <strong>
                      {syncLabel} {String(syncSeconds % 60).padStart(2, '0')}s
                    </strong>
                  </div>
                  <div className="sync-details">
                    <span>Earth signal delay</span>
                    <strong>~1.3 seconds</strong>
                  </div>
                  <div className="sync-details">
                    <span>Inside the colony</span>
                    <strong className="blue">Instant, always</strong>
                  </div>
                  <div className="sync-details">
                    <span>Library status</span>
                    <strong>Ready on the Moon</strong>
                  </div>
                  <SectionTitle>On the next transmission</SectionTitle>
                  {SONGS.filter((s) => s.pending).map((s) => (
                    <SongRow
                      key={s.id}
                      song={s}
                      onClick={() => toast('“' + s.title + '” is queued for the next sync')}
                      right={<Clock3 size={15} className="gold" />}
                    />
                  ))}
                  <p className="end-note">
                    You can add a queued song to the Weekly now.
                    <br />
                    Its story arrives instantly. The music will follow.
                  </p>
                </div>
                <div className="sheet-footer">
                  <Button variant="secondary" className="full-width" onClick={close}>
                    A little closer to home
                  </Button>
                </div>
              </Overlay>
            )}
            {active?.type === 'about' && (
              <Overlay title="Lunar · Est. 2033" onClose={close}>
                <div className="sheet-scroll">
                  <div className="wizard-head">
                    <h2>
                      One Moon.
                      <br />
                      Many worlds.
                    </h2>
                    <p>
                      A free music app for the people making a home here. Built for 512 colonists,
                      and everyone who comes next.
                    </p>
                  </div>
                  <div className="card">
                    <p className="small-copy">
                      A consortium of five countries and seven international companies brought us
                      here. Our songs will help us belong.
                    </p>
                    <div className="divider" />
                    <p className="small-copy">
                      We use colony shift time. Outside, each lunar day lasts about 29.5 Earth days:
                      a Longday and a Longnight.
                    </p>
                  </div>
                  <div className="sync-note">
                    <ShieldCheck size={19} />
                    <span>
                      Clickable presentation prototype.
                      <br />
                      Fictional people and songs. Simulated playback, recordings, and sharing.
                      Nothing is sent or stored.
                    </span>
                  </div>
                </div>
              </Overlay>
            )}
            {toastMessage && (
              <div className="toast" role="status" aria-live="polite">
                <Check size={17} />
                {toastMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
