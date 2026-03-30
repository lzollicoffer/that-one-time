/**
 * Mock data for the Israel–Palestine timeline.
 * To be replaced with Supabase queries via /lib/api/ functions.
 */

import { Timeline, TimelineEvent } from '@/types/timeline';

export const PALESTINE_ISRAEL_TIMELINE: Timeline = {
  id: 'israel-palestine-complete-history',
  slug: 'palestine-and-israel',
  title: 'Palestine\nand Israel',
  subtitle: 'A deep dive into the 100 year conflict.',
  period: '1517–2026',
  coverImageUrl: '/images/timelines/palestine-israel-hero.jpg',
  description:
    'A deep dive into a conflict that has spanned 100 years, reshaping the geopolitical landscape of the Middle East.',
  tags: ['tragic', 'recent'],
  status: 'published',
};

export const PALESTINE_ISRAEL_EVENTS: TimelineEvent[] = [
  {
    id: 'evt-1',
    timelineId: 'israel-palestine-complete-history',
    date: '1517 — 1917',
    title: 'Ottoman Rule',
    cardDescription:
      'For four centuries, the region was in the Ottoman Empire, characterized by a complex administrative structure and relative communal stability.',
    eventType: 'broad',
    imageUrl: '/images/events/ottoman-rule.jpg',
    sortOrder: 1,
    detailBullets: [
      {
        id: 'b-1-1',
        eventId: 'evt-1',
        content:
          'The Ottomans ruled a diverse empire that consisted of The Middle East, North Africa, and parts of Europe',
        sortOrder: 1,
      },
      {
        id: 'b-1-2',
        eventId: 'evt-1',
        content:
          'The population included Arabic speaking Muslims, Christian minorities, and a small but continuous Jewish population',
        sortOrder: 2,
      },
    ],
    images: [],
  },
  {
    id: 'evt-2',
    timelineId: 'israel-palestine-complete-history',
    date: '1917',
    title: 'Balfour Declaration',
    cardDescription:
      'A public statement issued by the British Government during World War I announcing support for the establishment of a "national home for the Jewish people" in Palestine.',
    eventType: 'specific',
    sortOrder: 2,
    detailBullets: [
      {
        id: 'b-2-1',
        eventId: 'evt-2',
        content:
          'The Balfour Declaration was a public statement in which Britain expressed support for the establishment in Palestine a "national home for the Jewish people"',
        sortOrder: 1,
      },
      {
        id: 'b-2-2',
        eventId: 'evt-2',
        content:
          'Britain aimed to secure Allied influence in the Middle East, especially near the Suez Canal, and believed the declaration might rally global Jewish opinion, particularly in the United States and Russia, behind the Allied war effort.',
        sortOrder: 2,
      },
      {
        id: 'b-2-3',
        eventId: 'evt-2',
        content:
          'This statement was issued without consulting the Arab majority in the region. Their political rights were not mentioned at all in the declaration, only civil and religious rights were acknowledged.',
        sortOrder: 3,
      },
    ],
    images: [],
  },
  {
    id: 'evt-3',
    timelineId: 'israel-palestine-complete-history',
    date: '1914–1918',
    title: 'World War 1',
    cardDescription:
      'The Great War brings the collapse of the Ottoman Empire, leading to the Allied occupation and the redrawing of Middle Eastern borders.',
    eventType: 'broad',
    imageUrl: '/images/events/ww1.jpg',
    sortOrder: 3,
    detailBullets: [
      {
        id: 'b-3-1',
        eventId: 'evt-3',
        content: 'The Ottomans sided with the Central Powers and lost',
        sortOrder: 1,
      },
      {
        id: 'b-3-2',
        eventId: 'evt-3',
        content: 'The Ottoman Empire was formally abolished in 1922',
        sortOrder: 2,
      },
    ],
    images: [],
  },
  {
    id: 'evt-4',
    timelineId: 'israel-palestine-complete-history',
    date: '1920–1948',
    title: 'British Mandate',
    cardDescription:
      'The formalization of British administrative control over the territory, as authorized by the League of Nations following the San Remo conference.',
    eventType: 'broad',
    imageUrl: '/images/events/british-mandate.jpg',
    sortOrder: 4,
    detailBullets: [
      {
        id: 'b-4-1',
        eventId: 'evt-4',
        content:
          'The newly formed League of Nations established a Mandate system allowing them to define and re-name regions previously ruled by the Ottoman Empire',
        sortOrder: 1,
      },
      {
        id: 'b-4-2',
        eventId: 'evt-4',
        content:
          'Borders were drawn based on modern colonial needs, wartime promises, and resource allocation',
        sortOrder: 2,
      },
    ],
    images: [],
  },
  {
    id: 'evt-5',
    timelineId: 'israel-palestine-complete-history',
    date: '1922',
    title: 'Mandate for Palestine',
    cardDescription:
      'The League of Nations Council approves a Mandate giving Great Britain authority over Palestine, explicitly incorporating the Balfour Declaration and recognizing historical connections.',
    eventType: 'specific',
    sortOrder: 5,
    detailBullets: [
      {
        id: 'b-5-1',
        eventId: 'evt-5',
        content:
          'Great Britain was assigned legal authority to govern the region of Palestine',
        sortOrder: 1,
      },
      {
        id: 'b-5-2',
        eventId: 'evt-5',
        content: 'Jewish immigration increases significantly',
        sortOrder: 2,
      },
      {
        id: 'b-5-3',
        eventId: 'evt-5',
        content: 'Zionist political and military institutions develop',
        sortOrder: 3,
      },
    ],
    images: [],
  },
  {
    id: 'evt-6',
    timelineId: 'israel-palestine-complete-history',
    date: '1936–1939',
    title: 'Arab Revolt',
    cardDescription:
      'Major anti-colonial uprising by Palestinian Arabs against British rule and increasing Jewish immigration under the Mandate. Beginning with strikes and protests and escalating into armed rebellion, it reflected growing fears of displacement and loss of political control.',
    eventType: 'broad',
    imageUrl: '/images/events/arab-revolt.jpg',
    sortOrder: 6,
    detailBullets: [
      {
        id: 'b-6-1',
        eventId: 'evt-6',
        content:
          'Rapid Jewish immigration, especially after 1933 amid European persecution, brought land purchases and social dislocation among Arab tenant farmers.',
        sortOrder: 1,
      },
      {
        id: 'b-6-2',
        eventId: 'evt-6',
        content:
          'Palestinians throughout the countryside came together in armed groups to attack British and Zionist targets with increasing organization.',
        sortOrder: 2,
      },
      {
        id: 'b-6-3',
        eventId: 'evt-6',
        content:
          'The British deployed 20,000 troops to suppress the uprising. Over the revolt\'s three years, some 5,000 Palestinians had been killed and nearly 15,000 wounded',
        sortOrder: 3,
      },
    ],
    images: [],
  },
  {
    id: 'evt-7',
    timelineId: 'israel-palestine-complete-history',
    date: '1947',
    title: 'UN Partition Plan',
    cardDescription:
      'At an attempt for conflict resolution- the United Nations Partition Plan for Palestine proposed dividing British-controlled Palestine into separate Jewish and Arab states, with Jerusalem under international administration.',
    eventType: 'specific',
    sortOrder: 7,
    detailBullets: [
      {
        id: 'b-7-1',
        eventId: 'evt-7',
        content:
          'Britain grows frustrated- aimed at resolving growing conflict, they involve the UN who decided to split Palestine into separate Arab and Jewish states',
        sortOrder: 1,
      },
      {
        id: 'b-7-2',
        eventId: 'evt-7',
        content:
          'The plan allocated about 55% of the territory to the Jewish state and 45% to the Arab state. At the time, Jews made up only about 1/3rd of the population',
        sortOrder: 2,
      },
      {
        id: 'b-7-3',
        eventId: 'evt-7',
        content:
          'The Jewish population accepted this plan as it provided international legitimacy for statehood.',
        sortOrder: 3,
      },
      {
        id: 'b-7-4',
        eventId: 'evt-7',
        content:
          'The Arab population rejected this split, considering this to be a reward for settler colonialism backed by superpowers. This kickstarts a civil war in the region.',
        sortOrder: 4,
      },
    ],
    images: [],
  },
  {
    id: 'evt-8',
    timelineId: 'israel-palestine-complete-history',
    date: '1948',
    title: 'Nakba and Israeli Independence',
    cardDescription:
      'In 1948, Israel declared independence following the end of British rule, leading to war with neighboring Arab states. During this conflict, over 700,000 Palestinians were displaced in what is known as the Nakba, or "catastrophe."',
    eventType: 'specific',
    sortOrder: 8,
    detailBullets: [
      {
        id: 'b-8-1',
        eventId: 'evt-8',
        content:
          'Britain announced it would not implement any plan that was not acceptable to both Arabs and Jews.',
        sortOrder: 1,
      },
      {
        id: 'b-8-2',
        eventId: 'evt-8',
        content:
          'Fighting broke out between Jewish and Arab forces (late 1947).',
        sortOrder: 2,
      },
      {
        id: 'b-8-3',
        eventId: 'evt-8',
        content: 'Britain withdrew in May 1948.',
        sortOrder: 3,
      },
      {
        id: 'b-8-4',
        eventId: 'evt-8',
        content:
          'Around 700,000 Palestinians became refugees. The exodus resulted from a combination of expulsion, war panic, and collapse of Palestinian civil society.',
        sortOrder: 4,
      },
      {
        id: 'b-8-5',
        eventId: 'evt-8',
        content:
          'Palestinians lost the fighting due to superior Zionist organization, military preparation, lack of unified Palestinian leadership, and disarray following the 1930s British suppression of Arab revolts.',
        sortOrder: 5,
      },
    ],
    images: [],
  },
  {
    id: 'evt-9',
    timelineId: 'israel-palestine-complete-history',
    date: '1949–1967',
    title: 'Displacement Era',
    cardDescription:
      'The Displacement Era (1949\u20131967) was marked by the aftermath of the 1948 war, as hundreds of thousands of Palestinians lived as refugees across the region while no independent Palestinian state was established.',
    eventType: 'broad',
    imageUrl: '/images/events/displacement-era.jpg',
    sortOrder: 9,
    detailBullets: [
      {
        id: 'b-9-1',
        eventId: 'evt-9',
        content:
          'Palestinian refugees settled in camps across the West Bank, Gaza, Jordan, Lebanon, and Syria',
        sortOrder: 1,
      },
      {
        id: 'b-9-2',
        eventId: 'evt-9',
        content:
          'The West Bank was administered by Jordan; Gaza by Egypt',
        sortOrder: 2,
      },
      {
        id: 'b-9-3',
        eventId: 'evt-9',
        content:
          'Early Palestinian political and militant groups began to form',
        sortOrder: 3,
      },
      {
        id: 'b-9-4',
        eventId: 'evt-9',
        content:
          'Ongoing border tensions and skirmishes between Israel and neighboring states',
        sortOrder: 4,
      },
    ],
    images: [],
  },
  {
    id: 'evt-10',
    timelineId: 'israel-palestine-complete-history',
    date: '1967',
    title: 'Six Day War',
    cardDescription:
      'A brief, decisive conflict where Israel defeated Egypt, Jordan, and Syria, dramatically altering the Middle East map',
    eventType: 'specific',
    sortOrder: 10,
    detailBullets: [
      {
        id: 'b-10-1',
        eventId: 'evt-10',
        content:
          'Israel launched a surprise air strike on June 5, 1967, destroying nearly all of Egypt\'s air force and gaining immediate air supremacy',
        sortOrder: 1,
      },
      {
        id: 'b-10-2',
        eventId: 'evt-10',
        content:
          'Fighting expanded to three fronts, Egypt/Gaza in the south, Jordan/West Bank in the east, and Syria/Golan Heights in the north',
        sortOrder: 2,
      },
      {
        id: 'b-10-3',
        eventId: 'evt-10',
        content:
          'Israel captured significant territory in just six days: the Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights',
        sortOrder: 3,
      },
      {
        id: 'b-10-4',
        eventId: 'evt-10',
        content:
          'Arab losses were severe, over 18,000 combined casualties across Egypt, Jordan, and Syria, compared to roughly 700 Israeli losses',
        sortOrder: 4,
      },
      {
        id: 'b-10-5',
        eventId: 'evt-10',
        content:
          'A UN ceasefire ended the war on June 10, leaving Israel in control of territories four times its original size.',
        sortOrder: 5,
      },
    ],
    images: [],
  },
  {
    id: 'evt-11',
    timelineId: 'israel-palestine-complete-history',
    date: '1967–1987',
    title: 'PLO and Armed Resistance',
    cardDescription:
      'The PLO and Armed Resistance Era (1967\u20131987) marked the rise of organized Palestinian nationalism following Israel\'s victory in the 1967 Six-Day War, which brought the West Bank and Gaza under Israeli occupation.',
    eventType: 'broad',
    imageUrl: '/images/events/plo-resistance.jpg',
    sortOrder: 11,
    detailBullets: [
      {
        id: 'b-11-1',
        eventId: 'evt-11',
        content:
          'The Palestine Liberation Organization became the central representative body of the Palestinian people',
        sortOrder: 1,
      },
      {
        id: 'b-11-2',
        eventId: 'evt-11',
        content:
          'Growth of militant factions within the PLO, including groups like Fatah and others',
        sortOrder: 2,
      },
      {
        id: 'b-11-3',
        eventId: 'evt-11',
        content:
          'Increased armed operations and attacks targeting Israeli military and civilian sites',
        sortOrder: 3,
      },
      {
        id: 'b-11-4',
        eventId: 'evt-11',
        content:
          'Regional conflicts and shifting alliances across the Middle East',
        sortOrder: 4,
      },
      {
        id: 'b-11-5',
        eventId: 'evt-11',
        content:
          'The PLO\'s gradual shift toward diplomatic recognition alongside armed struggle',
        sortOrder: 5,
      },
    ],
    images: [],
  },
  {
    id: 'evt-12',
    timelineId: 'israel-palestine-complete-history',
    date: '1987',
    title: 'First Intifada',
    cardDescription:
      'A widespread Palestinian uprising that began in the West Bank and Gaza, involving mass protests, civil disobedience, and clashes with Israeli forces.',
    eventType: 'specific',
    sortOrder: 12,
    detailBullets: [
      {
        id: 'b-12-1',
        eventId: 'evt-12',
        content:
          'A Palestinian uprising characterized by widespread civil disobedience and demonstrations emerged after two decades of Israeli military occupation',
        sortOrder: 1,
      },
      {
        id: 'b-12-2',
        eventId: 'evt-12',
        content:
          'Growing frustration over settlement expansion, economic hardship, and political stagnation fueled spontaneous demonstrations.',
        sortOrder: 2,
      },
      {
        id: 'b-12-3',
        eventId: 'evt-12',
        content:
          'The movement relied largely on civil resistance such as strikes, tax refusal, and boycotts of Israeli goods.',
        sortOrder: 3,
      },
      {
        id: 'b-12-4',
        eventId: 'evt-12',
        content:
          'Violent clashes also occurred. Palestinians used stones, Molotov cocktails, and improvised weapons against Israeli forces, who responded with curfews, mass arrests, and live ammunition.',
        sortOrder: 4,
      },
      {
        id: 'b-12-5',
        eventId: 'evt-12',
        content:
          'Hamas, an Islamic political and militant organization emerges',
        sortOrder: 5,
      },
    ],
    images: [],
  },
  {
    id: 'evt-13',
    timelineId: 'israel-palestine-complete-history',
    date: '1993',
    title: 'Oslo Accords',
    cardDescription:
      'A series of agreements between Israel and the Palestine Liberation Organization aimed at establishing a framework for peace and eventual Palestinian self-governance.',
    eventType: 'specific',
    sortOrder: 13,
    detailBullets: [
      {
        id: 'b-13-1',
        eventId: 'evt-13',
        content:
          'The PLO agreed to recognize Israel\'s right to exist, renounce armed struggle, and begin cooperation on security.',
        sortOrder: 1,
      },
      {
        id: 'b-13-2',
        eventId: 'evt-13',
        content:
          'Israel agreed to recognize the PLO as Palestinian representatives, allow limited Palestinian self-government in parts of Gaza and the West Bank.',
        sortOrder: 2,
      },
      {
        id: 'b-13-3',
        eventId: 'evt-13',
        content:
          'Israel did not recognize a Palestinian state or end occupation.',
        sortOrder: 3,
      },
      {
        id: 'b-13-4',
        eventId: 'evt-13',
        content:
          'The accords divided the West Bank into three zones (Palestinian control, Israeli control, and shared control) with the largest zone being designated to Israeli control',
        sortOrder: 4,
      },
      {
        id: 'b-13-5',
        eventId: 'evt-13',
        content:
          'While peace negotiations were happening Israeli settlements in occupied territory continued expanding. This shocked many Palestinians who expected Oslo to freeze expansion.',
        sortOrder: 5,
      },
      {
        id: 'b-13-6',
        eventId: 'evt-13',
        content:
          'The PLO agrees to the accords, grasping at a path back into Palestine after decades in exile. Despite this, violence and attacks, and expansion of settlements continued',
        sortOrder: 6,
      },
      {
        id: 'b-13-7',
        eventId: 'evt-13',
        content:
          'Hamas, against the PLO, rejects the accords entirely',
        sortOrder: 7,
      },
    ],
    images: [],
  },
  {
    id: 'evt-14',
    timelineId: 'israel-palestine-complete-history',
    date: '1995',
    title: 'Rabin Assassinated',
    cardDescription:
      'The assassination of Israeli Prime Minister Yitzhak Rabin in 1995 was carried out by a right-wing Israeli extremist opposed to the Oslo peace process.',
    eventType: 'specific',
    sortOrder: 14,
    detailBullets: [
      {
        id: 'b-14-1',
        eventId: 'evt-14',
        content:
          'Prime Minister Yitzhak Rabin was assassinated by an Israeli nationalist after a peace rally focused around the Oslo Accords.',
        sortOrder: 1,
      },
      {
        id: 'b-14-2',
        eventId: 'evt-14',
        content:
          'Yigal Amir was a law student at Bar-Ilan University and believed that peace negotiations were putting the security of Israel at risk',
        sortOrder: 2,
      },
    ],
    images: [],
  },
  {
    id: 'evt-15',
    timelineId: 'israel-palestine-complete-history',
    date: '2000',
    title: 'Camp David Summit',
    cardDescription:
      'A high-level negotiation between Israel and the Palestinian leadership mediated by the United States, aimed at reaching a final-status peace agreement.',
    eventType: 'specific',
    sortOrder: 15,
    detailBullets: [
      {
        id: 'b-15-1',
        eventId: 'evt-15',
        content:
          'In the summer of 2000, nearly 5 years after the assassination of Rabin, a 15-day negotiation mediated by Bill Clinton took place between Israeli Prime Minister Ehud Barak, and Palestinian Authority Chairman Yasser Arafat',
        sortOrder: 1,
      },
      {
        id: 'b-15-2',
        eventId: 'evt-15',
        content:
          'Jerusalem: This was the primary sticking point. Both sides claimed sovereignty over East Jerusalem and its holy sites',
        sortOrder: 2,
      },
      {
        id: 'b-15-3',
        eventId: 'evt-15',
        content:
          'Territory and Borders: Israel offered a Palestinian state on approximately 91\u201395% of the West Bank and 100% of the Gaza Strip, but Palestinians rejected the proposal, citing lack of territorial contiguity.',
        sortOrder: 3,
      },
      {
        id: 'b-15-4',
        eventId: 'evt-15',
        content:
          'Right of Return: Palestinians demanded the right for refugees from the 1948 war and their descendants to return to their original homes. Israel rejected this, fearing it would end Israel\'s character as a Jewish state.',
        sortOrder: 4,
      },
    ],
    images: [],
  },
  {
    id: 'evt-16',
    timelineId: 'israel-palestine-complete-history',
    date: '2000–2005',
    title: 'Second Intifada',
    cardDescription:
      'A period of intense Israeli-Palestinian violence that followed the breakdown of the Camp David peace talks and a visit to the Temple Mount/Haram al-Sharif by Ariel Sharon.',
    eventType: 'broad',
    imageUrl: '/images/events/second-intifada.jpg',
    sortOrder: 16,
    detailBullets: [
      {
        id: 'b-16-1',
        eventId: 'evt-16',
        content:
          'On September 28, Ariel Sharon, then leader of the Israeli opposition, visited the Al-Aqsa Mosque compound (Temple Mount) in Jerusalem, the third holiest site in Islam',
        sortOrder: 1,
      },
      {
        id: 'b-16-2',
        eventId: 'evt-16',
        content:
          'Sharon intended to publicly demonstrate that the site was under Israeli control. During the visit, he declared, "The Temple Mount is in our hands and will remain in our hands".',
        sortOrder: 2,
      },
      {
        id: 'b-16-3',
        eventId: 'evt-16',
        content:
          'This is considered the start of the second intifada, which was far more violent than the first. Featuring frequent armed confrontations, suicide bombings, and Israeli military incursions.',
        sortOrder: 3,
      },
      {
        id: 'b-16-4',
        eventId: 'evt-16',
        content:
          'By 2007, 4,228 Palestinians, 1,024 Israelis, and 63 foreigners had been killed, more than 50,000 Palestinians injured, and approximately 52,635 arrested.',
        sortOrder: 4,
      },
    ],
    images: [],
  },
  {
    id: 'evt-17',
    timelineId: 'israel-palestine-complete-history',
    date: '2006',
    title: 'Palestinian Legislative Elections',
    cardDescription:
      'The 2006 Palestinian legislative elections resulted in a surprise victory for Hamas over Fatah, leading to political deadlock and escalating tensions.',
    eventType: 'specific',
    sortOrder: 17,
    detailBullets: [
      {
        id: 'b-17-1',
        eventId: 'evt-17',
        content:
          'Palestinian legislative elections were held in January, 2006. The results shocked the world when Hamas won control of Gaza over Fatah (the dominant faction of the PLO)',
        sortOrder: 1,
      },
      {
        id: 'b-17-2',
        eventId: 'evt-17',
        content:
          'After Hamas\'s victory, the U.S. and others cut aid to the Palestinian Authority unless Hamas met conditions: recognize Israel, renounce violence, accept previous agreements.',
        sortOrder: 2,
      },
      {
        id: 'b-17-3',
        eventId: 'evt-17',
        content: 'Hamas refused.',
        sortOrder: 3,
      },
      {
        id: 'b-17-4',
        eventId: 'evt-17',
        content:
          'Instead of forming a stable unity government, tensions escalated into armed clashes and violence between Hamas and Fatah 2006-2007',
        sortOrder: 4,
      },
    ],
    images: [],
  },
  {
    id: 'evt-18',
    timelineId: 'israel-palestine-complete-history',
    date: '2007',
    title: 'The Battle of Gaza',
    cardDescription:
      'A brief but intense internal Palestinian conflict in which Hamas forces took control of the Gaza Strip from Fatah.',
    eventType: 'specific',
    sortOrder: 18,
    detailBullets: [
      {
        id: 'b-18-1',
        eventId: 'evt-18',
        content:
          'In June 2007, Hamas launched a military operation in Gaza and defeated Fatah forces.',
        sortOrder: 1,
      },
      {
        id: 'b-18-2',
        eventId: 'evt-18',
        content:
          'The fighting resulted in Hamas establishing exclusive governance over Gaza and Fatah retaining control of the West Bank, effectively creating the political and territorial split that continues today.',
        sortOrder: 2,
      },
      {
        id: 'b-18-3',
        eventId: 'evt-18',
        content:
          'Note: The US backed Fatah politically and materially, and attempts to counter Hamas influence during this period',
        sortOrder: 3,
      },
    ],
    images: [],
  },
  {
    id: 'evt-19',
    timelineId: 'israel-palestine-complete-history',
    date: '2005–2007',
    title: 'Gaza Split',
    cardDescription:
      'The aftermath of the 2007 Hamas takeover resulted in two separate Palestinian administrations: Hamas governing the Gaza Strip and Fatah-led PA governing the West Bank.',
    eventType: 'broad',
    imageUrl: '/images/events/gaza-split.jpg',
    sortOrder: 19,
    detailBullets: [
      {
        id: 'b-19-1',
        eventId: 'evt-19',
        content:
          'Gaza is now controlled by Hamas and the West Bank controlled by Fatah / Palestinian Authority',
        sortOrder: 1,
      },
      {
        id: 'b-19-2',
        eventId: 'evt-19',
        content:
          'These governments operate separately, have different policies, and sometimes act in opposition to each other',
        sortOrder: 2,
      },
      {
        id: 'b-19-3',
        eventId: 'evt-19',
        content:
          'After Hamas took control Israel (and Egypt) imposed a blockade on Gaza, restricting movement of people, goods, and trade',
        sortOrder: 3,
      },
      {
        id: 'b-19-4',
        eventId: 'evt-19',
        content:
          'Critics argue that this created a severe humanitarian situation for civilians limiting their access to free movement and resources such as water, fuel, healthcare, etc.',
        sortOrder: 4,
      },
    ],
    images: [],
  },
  {
    id: 'evt-20',
    timelineId: 'israel-palestine-complete-history',
    date: '2007–2022',
    title: 'Cycles of War and "Managed" Conflict',
    cardDescription:
      'The Israeli-Palestinian conflict entered a period defined by repeated escalations between Israel and Hamas in Gaza alongside periods of relative containment.',
    eventType: 'broad',
    imageUrl: '/images/events/cycles-of-war.jpg',
    sortOrder: 20,
    detailBullets: [
      {
        id: 'b-20-1',
        eventId: 'evt-20',
        content:
          'After the 2007 Gaza Split, the conflict entered a prolonged period of managed instability: Israel, Hamas, and Fatah/PA engaged in periodic violence, rocket attacks, and military operations.',
        sortOrder: 1,
      },
      {
        id: 'b-20-2',
        eventId: 'evt-20',
        content:
          'While wars flared repeatedly, the underlying political and territorial status quo persisted, creating a cycle of conflict without resolution.',
        sortOrder: 2,
      },
    ],
    images: [],
  },
  {
    id: 'evt-21',
    timelineId: 'israel-palestine-complete-history',
    date: '2008–2009',
    title: 'Operation Cast Lead',
    cardDescription:
      'A major Israeli military operation launched in December 2008 in response to sustained rocket fire from Hamas-controlled Gaza into southern Israel.',
    eventType: 'specific',
    sortOrder: 21,
    detailBullets: [
      {
        id: 'b-21-1',
        eventId: 'evt-21',
        content:
          'Israel initiated the operation with an extensive air campaign targeting Hamas security installations, followed by a ground invasion on January 3, 2009.',
        sortOrder: 1,
      },
      {
        id: 'b-21-2',
        eventId: 'evt-21',
        content:
          'The war caused significant civilian casualties and large-scale destruction of infrastructure in Gaza, displacing tens of thousands.',
        sortOrder: 2,
      },
    ],
    images: [],
  },
  {
    id: 'evt-22',
    timelineId: 'israel-palestine-complete-history',
    date: '2014',
    title: 'Operation Protective Edge',
    cardDescription:
      'A 50-day conflict between Israel and Hamas, triggered by escalating tensions including rocket fire from Gaza and the kidnapping and killing of Israeli teenagers.',
    eventType: 'specific',
    sortOrder: 22,
    detailBullets: [
      {
        id: 'b-22-1',
        eventId: 'evt-22',
        content:
          'Tensions rose after the June 2014 abduction and murder of three Israeli teenagers, leading Israel to launch Operation Brother\'s Keeper in the West Bank.',
        sortOrder: 1,
      },
      {
        id: 'b-22-2',
        eventId: 'evt-22',
        content:
          'The war involved extensive Israeli airstrikes and a ground operation in Gaza aimed at destroying Hamas tunnels and military infrastructure.',
        sortOrder: 2,
      },
    ],
    images: [],
  },
  {
    id: 'evt-23',
    timelineId: 'israel-palestine-complete-history',
    date: 'October 7, 2023',
    title: 'Hamas Launches Large-Scale Attack',
    cardDescription:
      'A large-scale, coordinated assault launched from Gaza into southern Israel, involving cross-border infiltration, attacks on civilians and military sites, and hostage-taking.',
    eventType: 'specific',
    sortOrder: 23,
    detailBullets: [
      {
        id: 'b-23-1',
        eventId: 'evt-23',
        content:
          'The October 7 attacks were a large-scale, Hamas-led assault on Israel launched from the Gaza Strip on October 7, 2023.',
        sortOrder: 1,
      },
      {
        id: 'b-23-2',
        eventId: 'evt-23',
        content:
          'It marked the deadliest day in Israel\'s history, killing roughly 1,200 people, mostly civilians, and leading to the capture of more than 240 hostages.',
        sortOrder: 2,
      },
    ],
    images: [],
  },
  {
    id: 'evt-24',
    timelineId: 'israel-palestine-complete-history',
    date: '2023–2025',
    title: 'Gaza War',
    cardDescription:
      'Ongoing large-scale conflict between Israel and Hamas that began after the October 7 attacks, involving extensive Israeli air and ground operations in Gaza.',
    eventType: 'broad',
    imageUrl: '/images/events/gaza-war.jpg',
    sortOrder: 24,
    detailBullets: [
      {
        id: 'b-24-1',
        eventId: 'evt-24',
        content:
          'Israel declared a state of war hours after the attacks, and the Israel Defense Forces launched massive airstrikes and ground operations in Gaza.',
        sortOrder: 1,
      },
      {
        id: 'b-24-2',
        eventId: 'evt-24',
        content:
          'The U.S. deployed military assets to the region to aid Israel and deter wider regional escalation.',
        sortOrder: 2,
      },
      {
        id: 'b-24-3',
        eventId: 'evt-24',
        content:
          'By 2024, the conflict had resulted in tens of thousands of Palestinian deaths, extensive displacement, and widespread destruction of Gaza\'s infrastructure.',
        sortOrder: 3,
      },
    ],
    images: [],
  },
  {
    id: 'evt-25',
    timelineId: 'israel-palestine-complete-history',
    date: '2025–2026',
    title: 'Fragile Ceasefire',
    cardDescription:
      'Major hostilities pause under a mediated peace plan.',
    eventType: 'specific',
    sortOrder: 25,
    detailBullets: [
      {
        id: 'b-25-1',
        eventId: 'evt-25',
        content:
          'Israel and Hamas, with mediation from the United States, Egypt, Qatar and other parties, signed a comprehensive ceasefire agreement \u2014 part of a broader "Gaza peace plan."',
        sortOrder: 1,
      },
      {
        id: 'b-25-2',
        eventId: 'evt-25',
        content:
          'Major hostilities largely pause under a phased peace plan that includes hostage releases, prisoner exchanges, humanitarian access, and partial troop withdrawals, though violations and political tensions continue.',
        sortOrder: 2,
      },
    ],
    images: [],
  },
];
