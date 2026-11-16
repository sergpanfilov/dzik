// Dzik czyta — тайная болтовня Bączka. Новые фразы открываются по сумме звёзд и нигде не объявляются (решение Сержа 16.11.2026):
// ребёнок просто замечает, что Bączek стал разговорчивее. Виды: hello — приветствие на главной, right — верный ответ,
// done — подпись на итоге, tap — если нажать на Bączka на главной. {n} — имя ученицы (если не задано, убирается с запятой).
window.DZIK_TALK = [
  { stars: 0, tap: ["Hej! To łaskocze!", "Chrum. Jestem zajęty myśleniem.", "Nie szturchaj, bo pęknie mi kamizelka."],
    done: ["Brawo! Historia przeczytana!", "Dobra robota! Bączek jest dumny.", "Koniec historii. Ale nie koniec przygód!"] },
  { stars: 25,
    hello: ["Chrum, chrum! Już nie mogłem się doczekać.", "O, jesteś! Książki same się nie przeczytają."],
    right: ["Chrum! Mądra głowa!", "Ha! Tego nawet ja nie wiedziałem."],
    done: ["Dobra robota. Zasłużyłem na drzemkę. To znaczy… ty zasłużyłaś."],
    tap: ["Wiesz, że świnie są bardzo mądre? Ja na pewno."] },
  { stars: 60,
    hello: ["Czytałem w nocy pod kołdrą. Ale ciii, nikomu nie mów.", "Cześć, {n}! Tęskniłem."],
    right: ["No proszę! Czytasz jak profesorka.", "Trafione! Chrum-chrum!"],
    done: ["Moja kamizelka aż zrobiła się ciasna z dumy."],
    tap: ["Kiedyś przeczytam całą bibliotekę. Albo zjem. Zobaczymy.", "Moje ulubione słowo to „żołądź”. Powiedz je szybko trzy razy!"] },
  { stars: 120,
    hello: ["Zgadnij, kto się dziś wyspał? Ja! Możemy czytać.", "Przyniosłem ci w myślach jabłko. Smacznego!"],
    right: ["Bystra jak dzik w lesie!", "Tak jest! Aż mi ogonek zawirował."],
    done: ["Gdyby za czytanie dawali żołędzie, miałabyś już cały worek."],
    tap: ["Ćśś… słyszysz? To mój brzuch czyta na głos.", "Najlepsze błoto jest po deszczu. A najlepsze historie — z tobą."] },
  { stars: 200,
    hello: ["Uwaga, uwaga! Wielka czytelniczka przybyła!", "Chrum! Czuję, że dziś będzie dobra historia."],
    right: ["Ty to masz głowę! Większą niż moja. No… prawie.", "Brawo! Zapiszę to w moim świńskim pamiętniku."],
    done: ["Opowiem o tym kuzynom w lesie. Będą zazdrościć."],
    tap: ["Mój dziadek mówił: kto czyta, ten nie chrapie. Ale dziadek chrapał.", "Nie mów nikomu, ale czasem po kryjomu czytam bajki dla prosiaczków."] },
  { stars: 320,
    hello: ["Ooo, moja ulubiona czytelniczka!", "Myślałem o tobie przy śniadaniu. I przy drugim śniadaniu. I przy trzecim."],
    right: ["Jesteś niesamowita! Chrum-chrum-chrum!", "Czytasz tak dobrze, że prawie zgubiłem okulary z wrażenia."],
    done: ["To był dzień jak z książki. A ty jesteś w niej bohaterką."],
    tap: ["Gdybym miał skrzydła, latałbym do biblioteki.", "Jesteśmy drużyną: ty czytasz, ja się zachwycam."] },
  { stars: 450,
    hello: ["Witaj, wielka mistrzyni czytania! Bączek się kłania."],
    right: ["Legendarnie!"],
    done: ["Zostaniesz kiedyś pisarką. A ja będę w twojej pierwszej książce, dobrze?"],
    tap: ["Dziękuję, że ze mną czytasz. Serio. Chrum."] }
];

// Остальные реплики (все озвучены). wearOn/wearOff — когда Саша надевает или снимает вещь (и wearOn — когда вещь заработана);
// slow — если темп потерян (долго без нажатий или чтение затянулось), четыре настроения: поминает папу всуе, скучает,
// злится, делает вид, что не узнаёт (просьба Сержа);
// tierUp — когда сумма звёзд перешла ступень болтовни; freeDone — конец дополнительного упражнения.
window.DZIK_TALK_MORE = {
  wearOn: {
    acc1: ["Szalik! Teraz nie straszny mi żaden przeciąg.", "Mięciutki! Jak kołderka na szyję."],
    acc2: ["Okulary! Od razu wyglądam jak profesor.", "O, teraz widzę każdą literkę!"],
    acc3: ["Kokardka! No i kto tu jest najpiękniejszym prosiaczkiem?", "Różowa! Pasuje mi do ryjka."],
    acc4: ["Plecak z książkami! Gotowy do szkoły… albo na piknik.", "Ciężki! Ile tu jest książek?"],
    acc5: ["Kalosze! Idziemy skakać po kałużach!", "Żółte jak słoneczko. I nie przemokną!"],
    acc6: ["Czapka daszkiem do tyłu! Jestem teraz bardzo modny.", "Czapka! Żadne słońce mnie nie pokona."],
    acc7: ["Wianek mistrza! Kłaniajcie się, nadchodzi król czytania!", "Pachnie łąką! Czuję się jak bohater z bajki."]
  },
  wearOff: {
    acc1: ["Dobra, zdejmuję. I tak trochę drapał.", "Bez szalika? Brr… ale niech będzie."],
    acc2: ["Bez okularów… kto to? Ty czy szafa?", "Zdejmuję. Oczy też muszą odpocząć."],
    acc3: ["Kokardka do szafy. Ale tylko na chwilkę!", "Bez kokardki jestem bardziej groźny. Grrr!"],
    acc4: ["Uff, jak lekko! Zaraz odfrunę!", "Plecak zdjęty. Książki niech odpoczną."],
    acc5: ["Bose kopytka! Ale zimno w nóżki.", "Kalosze zdjęte. Błoto, uważaj, idę!"],
    acc6: ["Czapka zdjęta. Mam fryzurę jak po burzy!", "Bez czapki też jestem przystojny, prawda?"],
    acc7: ["Wianek zdjęty. Mistrz też czasem odpoczywa.", "Schowam go ostrożnie, żeby się nie pogniótł."]
  },
  slow: {
    // настроение выбирается случайно; у каждого свой кадр Bączka
    dad: [
      "Na kapcie taty! Zasnęłaś?",
      "Na skarpetki taty! Halo, jest tu ktoś?",
      "Rety, rety, na krawat taty! Ruszamy?",
      "Na klucze taty! Gdzie się podziała moja czytelniczka?",
      "Na pilota od telewizora taty! Klikamy dalej!",
      "Ojej, tak wolno to nawet tata nie czyta gazety!",
      "Tata by powiedział: no dalej! A ja mówię to samo, tylko grubszym głosem.",
      "Na brodę mojego dziadka i kapcie twojego taty! Do roboty!",
      "Tata mówi, że to ja jestem leniwy. A tu proszę, ktoś mnie przegania w drzemaniu!"
    ],
    bored: [
      "Nuuudy… Policzyłem już wszystkie muchy na suficie.",
      "Ziewam tak, że zaraz połknę książkę.",
      "Czekam, czekam… Chyba zapuszczę brodę.",
      "Tak mi się nudzi, że zacząłem czytać instrukcję od kaloszy."
    ],
    angry: [
      "Grrr! Ile można czekać? Mój brzuch już burczy ze złości!",
      "No nie! Kamizelka mi się marszczy od tego czekania!",
      "Hmpf! Obrażam się. Na trzy sekundy. Raz, dwa… dobra, już nie.",
      "Zaraz tupnę kopytkiem! O, tupnąłem. Czytamy?"
    ],
    stranger: [
      "Przepraszam, a pani to kto? Moja czytelniczka była szybsza.",
      "Hm… czy my się znamy? Moja koleżanka już dawno by kliknęła.",
      "Halo? Czy to ta sama dziewczynka, co wczoraj czytała jak rakieta?",
      "Nie poznaję cię! Chyba ktoś podmienił moją czytelniczkę na żółwia."
    ]
  },
  tierUp: [
    "Ale gwiazdek! Aż mi się kręci w ryjku!",
    "Gwiazdka do gwiazdki i robi się cała galaktyka! Brawo!",
    "Tyle gwiazdek… chyba urosłem. Albo zjadłem za dużo."
  ],
  freeDone: ["Dodatkowe ćwiczenie zrobione! Ale z ciebie pracuś!", "Jeszcze jedno ćwiczenie zaliczone. Podziwiam!"]
};
