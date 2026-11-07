// Dzik czyta — библиотека текстов. Оригинальные истории на польском (3 класс), к каждой: вопросы (первый вариант — верный,
// перемешиваются при показе), карточки событий в правильном порядке. Упражнения на знаки строятся из текста автоматически.
// Типы вопросов: fakt, szczegół, dlaczego, słowo, znak (ответ зависит от знака препинания).
window.DZIK_TEXTS = [
// ---------- Poziom 1: 60–100 słów, krótkie zdania ----------
{ id: "p1-jablko", level: 1, topic: "dzik", title: "Bączek i jabłko",
  body: `Bączek to mały dzik. Mieszka w lesie, blisko starego dębu. Rano Bączek szuka jedzenia. Pod dębem leżą żołędzie, ale on marzy o jabłku. Idzie na skraj lasu. Tam rośnie jabłoń. Na trawie leży jedno czerwone jabłko. Bączek wącha je i mówi: „Pachnie jak lato!”. Zjada jabłko w trzy kęsy. Z radości robi małego bąka. Ptaki na gałęzi się śmieją. Czy Bączek się wstydzi? Nie, on też się śmieje. Potem wraca do dębu i zasypia w cieniu.`,
  questions: [
    { type: "fakt", q: "Gdzie mieszka Bączek?", a: ["W lesie, blisko starego dębu.", "Na łące, przy rzece.", "W ogrodzie za domem."] },
    { type: "szczegół", q: "Jakiego koloru było jabłko?", a: ["Czerwone.", "Zielone.", "Żółte."] },
    { type: "dlaczego", q: "Dlaczego Bączek poszedł na skraj lasu?", a: ["Bo marzył o jabłku.", "Bo bał się ptaków.", "Bo szukał mamy."] },
    { type: "słowo", q: "Co znaczy „zjadł w trzy kęsy”?", a: ["Zjadł bardzo szybko, trzema ugryzieniami.", "Jadł bardzo powoli, przez cały dzień.", "Jadł razem z trzema kolegami."] },
    { type: "znak", q: "Które zdanie z tekstu jest pytaniem?", a: ["Czy Bączek się wstydzi?", "Ptaki na gałęzi się śmieją.", "Pachnie jak lato!"] }
  ],
  events: ["Bączek szuka jedzenia pod dębem.", "Idzie na skraj lasu do jabłoni.", "Zjada czerwone jabłko.", "Ptaki się śmieją, Bączek też.", "Wraca do dębu i zasypia."] },

{ id: "p1-zosia", level: 1, topic: "szkoła", title: "Nowa koleżanka",
  body: `Do klasy trzeciej przyszła nowa dziewczynka. Ma na imię Zosia. Stoi przy drzwiach i trzyma niebieski plecak. Pani mówi: „Zosiu, usiądź obok Marty”. Marta robi miejsce na ławce. Na przerwie dziewczynki jedzą kanapki. Zosia ma kanapkę z serem, Marta z szynką. Zamieniają się połówkami. Czy Zosia nadal się boi? Już nie. Po lekcjach idą razem do szatni. Zosia mówi: „Jutro przyniosę naklejki”. Marta się uśmiecha. To był dobry dzień.`,
  questions: [
    { type: "fakt", q: "Jak ma na imię nowa dziewczynka?", a: ["Zosia.", "Marta.", "Ola."] },
    { type: "szczegół", q: "Jakiego koloru jest plecak Zosi?", a: ["Niebieski.", "Czerwony.", "Zielony."] },
    { type: "dlaczego", q: "Dlaczego Marta zrobiła miejsce na ławce?", a: ["Bo pani poprosiła, żeby Zosia usiadła obok niej.", "Bo chciała iść do domu.", "Bo Zosia ją popchnęła."] },
    { type: "słowo", q: "Co to jest „szatnia”?", a: ["Miejsce, gdzie zostawia się kurtki i buty.", "Sala do grania w piłkę.", "Sklep z plecakami."] },
    { type: "znak", q: "Kto mówi: „Jutro przyniosę naklejki”?", a: ["Zosia.", "Marta.", "Pani."] }
  ],
  events: ["Zosia przychodzi do klasy z niebieskim plecakiem.", "Pani sadza ją obok Marty.", "Na przerwie dziewczynki zamieniają się kanapkami.", "Po lekcjach idą razem do szatni."] },

{ id: "p1-mecz", level: 1, topic: "sport", title: "Mecz na podwórku",
  body: `Na podwórku stoją dwie bramki z plecaków. Kuba i Hania grają w piłkę. Kuba jest bramkarzem, Hania strzela. Pierwszy strzał leci za wysoko. Drugi strzał trafia w słupek, czyli w plecak. Hania bierze rozbieg. Czy trafi tym razem? Piłka toczy się po trawie, mija ręce Kuby i wpada do bramki. „Gol!” woła Hania i biegnie dookoła podwórka. Kuba się śmieje i mówi: „Teraz ja strzelam”. Zamieniają się miejscami. Grają aż do kolacji.`,
  questions: [
    { type: "fakt", q: "Kto był bramkarzem na początku?", a: ["Kuba.", "Hania.", "Tata."] },
    { type: "szczegół", q: "Z czego zrobione są bramki?", a: ["Z plecaków.", "Z patyków.", "Z kamieni."] },
    { type: "dlaczego", q: "Dlaczego Hania biegnie dookoła podwórka?", a: ["Bo strzeliła gola i się cieszy.", "Bo zgubiła piłkę.", "Bo spieszy się na kolację."] },
    { type: "słowo", q: "Co znaczy „wziąć rozbieg”?", a: ["Pobiec kawałek przed kopnięciem piłki.", "Usiąść na trawie.", "Rzucić piłkę ręką."] },
    { type: "znak", q: "Kto woła: „Gol!”?", a: ["Hania.", "Kuba.", "Mama."] }
  ],
  events: ["Pierwszy strzał Hani leci za wysoko.", "Drugi strzał trafia w słupek.", "Trzeci strzał wpada do bramki.", "Kuba i Hania zamieniają się miejscami.", "Grają do kolacji."] },

{ id: "p1-jez", level: 1, topic: "przyroda", title: "Nocny gość",
  body: `Wieczorem Ola wychodzi do ogrodu. Pod krzakiem coś szeleści. To jeż! Jest mały i ma mokry nos. Ola stoi cicho i nie rusza się. Jeż wącha trawę, potem idzie do miski kota. W misce jest woda. Jeż pije długo. Czy można go pogłaskać? Nie, jeż ma ostre kolce. Ola tylko patrzy. Po chwili jeż znika w trawie. Ola wraca do domu i rysuje jeża w zeszycie. Pod rysunkiem pisze: „Mój nocny gość”.`,
  questions: [
    { type: "fakt", q: "Kiedy Ola wychodzi do ogrodu?", a: ["Wieczorem.", "Rano.", "W południe."] },
    { type: "szczegół", q: "Co jeż pił z miski kota?", a: ["Wodę.", "Mleko.", "Sok."] },
    { type: "dlaczego", q: "Dlaczego Ola nie głaszcze jeża?", a: ["Bo jeż ma ostre kolce.", "Bo jeż uciekł.", "Bo mama nie pozwoliła."] },
    { type: "słowo", q: "Co znaczy „coś szeleści”?", a: ["Coś wydaje cichy szmer, jak suche liście.", "Coś głośno szczeka.", "Coś świeci w ciemności."] },
    { type: "znak", q: "Które zdanie z tekstu jest pytaniem?", a: ["Czy można go pogłaskać?", "To jeż!", "Jeż pije długo."] }
  ],
  events: ["Ola słyszy szelest pod krzakiem.", "Jeż idzie do miski kota i pije wodę.", "Jeż znika w trawie.", "Ola rysuje jeża w zeszycie."] },

{ id: "p1-deszcz", level: 1, topic: "taniec", title: "Taniec w deszczu",
  body: `W sobotę pada deszcz. Maja chciała iść na plac zabaw, ale nie może. Siada przy oknie i wzdycha. Tata włącza muzykę. „Zatańczymy?” pyta. Maja kręci głową, lecz nogi same stukają w podłogę. Po chwili wstaje. Tańczy po kuchni, kręci się, podskakuje. Kot ucieka pod stół. Mama klaszcze w rytm. Deszcz stuka w szyby jak bębenek. Kiedy muzyka się kończy, Maja jest zdyszana i wesoła. „Jutro też pada?” pyta z nadzieją.`,
  questions: [
    { type: "fakt", q: "Dokąd Maja chciała iść w sobotę?", a: ["Na plac zabaw.", "Do szkoły.", "Do babci."] },
    { type: "szczegół", q: "Kto włączył muzykę?", a: ["Tata.", "Mama.", "Maja."] },
    { type: "dlaczego", q: "Dlaczego kot uciekł pod stół?", a: ["Bo Maja tańczyła i podskakiwała po kuchni.", "Bo padał deszcz.", "Bo mama go wygoniła."] },
    { type: "słowo", q: "Co znaczy „zdyszana”?", a: ["Oddycha szybko po wysiłku.", "Jest smutna.", "Śpi."] },
    { type: "znak", q: "Kto pyta: „Zatańczymy?”", a: ["Tata.", "Maja.", "Mama."] }
  ],
  events: ["Maja siedzi przy oknie i wzdycha.", "Tata włącza muzykę.", "Maja tańczy po kuchni.", "Muzyka się kończy, Maja jest zdyszana i wesoła."] },

{ id: "p1-jezioro", level: 1, topic: "podróże", title: "Nad jeziorem",
  body: `Rodzina Nowaków jedzie nad jezioro. Droga jest długa. Franek liczy czerwone samochody. Doliczył do dwunastu. Nad jeziorem jest cicho. Woda jest zimna, ale czysta. Tata nadmuchuje materac. Franek zbiera płaskie kamienie i puszcza kaczki. Jeden kamień skacze pięć razy! Potem rodzina je kanapki na kocu. Nagle wiatr porywa czapkę mamy. Czy czapka wpadnie do wody? Franek biegnie i łapie ją w ostatniej chwili. Mama mówi: „Jesteś moim bohaterem”.`,
  questions: [
    { type: "fakt", q: "Dokąd jedzie rodzina Nowaków?", a: ["Nad jezioro.", "Nad morze.", "W góry."] },
    { type: "szczegół", q: "Ile czerwonych samochodów policzył Franek?", a: ["Dwanaście.", "Pięć.", "Dziesięć."] },
    { type: "dlaczego", q: "Dlaczego mama nazwała Franka bohaterem?", a: ["Bo złapał jej czapkę, zanim wpadła do wody.", "Bo kamień skoczył pięć razy.", "Bo policzył samochody."] },
    { type: "słowo", q: "Co znaczy „puszczać kaczki”?", a: ["Rzucać płaskie kamienie tak, żeby skakały po wodzie.", "Karmić ptaki na jeziorze.", "Pływać na materacu."] },
    { type: "znak", q: "Które zdanie ma na końcu wykrzyknik?", a: ["Jeden kamień skacze pięć razy!", "Woda jest zimna, ale czysta.", "Czy czapka wpadnie do wody?"] }
  ],
  events: ["Franek liczy czerwone samochody w drodze.", "Nad jeziorem puszcza kaczki.", "Rodzina je kanapki na kocu.", "Wiatr porywa czapkę mamy.", "Franek łapie czapkę."] },

{ id: "p1-piosenka", level: 1, topic: "dzik", title: "Bączek śpiewa",
  body: `W lesie jest konkurs piosenki. Sowa jest sędzią. Pierwszy śpiewa słowik. Jego głos jest piękny jak dzwonek. Potem śpiewa żaba. Rechocze głośno i wszyscy się śmieją. Na końcu wychodzi Bączek. Dzik bierze głęboki oddech. Zamiast piosenki z jego brzucha wylatuje głośny bąk. Las milczy. Czy Bączek przegrał? Sowa poprawia okulary i mówi: „To była najśmieszniejsza piosenka”. Daje mu nagrodę za humor. Bączek dostaje wianek z liści. Jest bardzo dumny.`,
  questions: [
    { type: "fakt", q: "Kto był sędzią w konkursie?", a: ["Sowa.", "Słowik.", "Żaba."] },
    { type: "szczegół", q: "Co dostał Bączek w nagrodę?", a: ["Wianek z liści.", "Koszyk jabłek.", "Złoty medal."] },
    { type: "dlaczego", q: "Dlaczego sowa dała Bączkowi nagrodę?", a: ["Za humor, bo wszystkich rozśmieszył.", "Za piękny głos.", "Za to, że był pierwszy."] },
    { type: "słowo", q: "Co znaczy „rechocze”?", a: ["Wydaje głos jak żaba.", "Śpiewa cicho.", "Skacze wysoko."] },
    { type: "znak", q: "Kto mówi: „To była najśmieszniejsza piosenka”?", a: ["Sowa.", "Bączek.", "Słowik."] }
  ],
  events: ["Słowik śpiewa pięknie.", "Żaba rechocze i wszyscy się śmieją.", "Bączek zamiast piosenki robi bąka.", "Sowa daje Bączkowi nagrodę za humor."] },

{ id: "p1-rekawiczka", level: 1, topic: "szkoła", title: "Zgubiona rękawiczka",
  body: `Zimą Antek idzie do szkoły w nowych rękawiczkach. Są zielone, z białymi paskami. Po lekcjach ma tylko jedną. Gdzie jest druga? Antek szuka w plecaku, w ławce i w szatni. Nie ma. Smutny wraca do domu. Pod drzewem przy szkole siedzi mała dziewczynka z pierwszej klasy. Na jej ręce jest zielona rękawiczka z paskami. „To moja!” mówi Antek. Dziewczynka oddaje ją i mówi: „Leżała na śniegu”. Antek dziękuje. Teraz chowa rękawiczki do kieszeni, zanim wejdzie do klasy.`,
  questions: [
    { type: "fakt", q: "Gdzie Antek znalazł rękawiczkę?", a: ["Na ręce dziewczynki z pierwszej klasy.", "W szatni.", "W plecaku."] },
    { type: "szczegół", q: "Jakie były rękawiczki Antka?", a: ["Zielone z białymi paskami.", "Białe z zielonymi kropkami.", "Czerwone."] },
    { type: "dlaczego", q: "Dlaczego Antek teraz chowa rękawiczki do kieszeni?", a: ["Żeby ich znowu nie zgubić.", "Bo są brzydkie.", "Bo pani tak kazała."] },
    { type: "słowo", q: "Co znaczy „smutny wraca do domu”?", a: ["Idzie do domu i jest mu przykro.", "Biegnie do domu z radości.", "Wraca do domu, śpiewając."] },
    { type: "znak", q: "Które zdanie z tekstu jest pytaniem?", a: ["Gdzie jest druga?", "To moja!", "Nie ma."] }
  ],
  events: ["Antek idzie do szkoły w nowych rękawiczkach.", "Po lekcjach ma tylko jedną.", "Szuka w plecaku, w ławce i w szatni.", "Widzi rękawiczkę u dziewczynki pod drzewem.", "Dziewczynka oddaje rękawiczkę."] },

// ---------- Poziom 2: 100–150 słów, wyliczenia, pytania ----------
{ id: "p2-plecak", level: 2, topic: "dzik", title: "Co jest w plecaku Bączka?",
  body: `Bączek wybiera się na wycieczkę. Pakuje plecak od samego rana. Co bierze? Trzy jabłka, garść żołędzi, butelkę wody, mapę lasu i książkę o grzybach. Plecak jest ciężki, ale dzik jest silny. Idzie ścieżką nad strumień. Po drodze spotyka zająca. „Dokąd idziesz?” pyta zając. „Na szczyt Łysej Góry” odpowiada Bączek. Zając się śmieje: „Z takim plecakiem? Nigdy tam nie dojdziesz!”. Bączek nie słucha. Idzie dalej, sapie, przystaje, znów idzie. W połowie drogi zjada jabłko. Na szczycie zdejmuje plecak i siada. Widok jest piękny: las, rzeka i daleki wiatrak. Z radości puszcza bąka, a echo powtarza go trzy razy. Zając na dole słyszy i mówi: „No dobrze, jednak dał radę”.`,
  questions: [
    { type: "fakt", q: "Dokąd wybiera się Bączek?", a: ["Na szczyt Łysej Góry.", "Nad morze.", "Do zająca."] },
    { type: "szczegół", q: "Ile jabłek wziął Bączek?", a: ["Trzy.", "Pięć.", "Jedno."] },
    { type: "dlaczego", q: "Dlaczego zając śmiał się z Bączka?", a: ["Bo myślał, że dzik z ciężkim plecakiem nie dojdzie na szczyt.", "Bo Bączek zjadł jabłko.", "Bo Bączek nie miał mapy."] },
    { type: "słowo", q: "Co znaczy „sapie”?", a: ["Głośno i ciężko oddycha.", "Śpiewa.", "Śpi."] },
    { type: "znak", q: "Kto pyta: „Dokąd idziesz?”", a: ["Zając.", "Bączek.", "Echo."] }
  ],
  events: ["Bączek pakuje plecak.", "Spotyka zająca nad strumieniem.", "W połowie drogi zjada jabłko.", "Siada na szczycie i patrzy na widok.", "Zając słyszy echo i przyznaje, że dzik dał radę."] },

{ id: "p2-talenty", level: 2, topic: "szkoła", title: "Konkurs talentów",
  body: `W piątek w klasie trzeciej był konkurs talentów. Każdy mógł pokazać, co umie. Jacek żonglował trzema piłeczkami. Ala zagrała na flecie piosenkę o wiośnie. Bliźniaki, Staś i Jaś, pokazali sztuczkę z kartami. A co zrobiła Nina? Nina długo się wahała. Lubi tańczyć, ale wstydzi się występować. Pani zapytała: „Spróbujesz?”. Nina kiwnęła głową. Włączyła muzykę z telefonu i zaczęła tańczyć. Najpierw powoli, potem coraz szybciej. Klasa klaskała do rytmu. Kiedy skończyła, wszyscy krzyknęli: „Brawo!”. Nina była czerwona jak pomidor, ale uśmiechała się od ucha do ucha. Pani powiedziała, że każdy talent jest ważny: i żonglowanie, i granie, i sztuczki, i taniec. Nagrodą dla wszystkich była wspólna pizza na przerwie.`,
  questions: [
    { type: "fakt", q: "Kto grał na flecie?", a: ["Ala.", "Nina.", "Jacek."] },
    { type: "szczegół", q: "Iloma piłeczkami żonglował Jacek?", a: ["Trzema.", "Dwiema.", "Czterema."] },
    { type: "dlaczego", q: "Dlaczego Nina długo się wahała?", a: ["Bo wstydziła się występować.", "Bo nie lubi tańczyć.", "Bo zapomniała telefonu."] },
    { type: "słowo", q: "Co znaczy „uśmiechała się od ucha do ucha”?", a: ["Uśmiechała się bardzo szeroko.", "Zatykała uszy.", "Płakała."] },
    { type: "znak", q: "Kto pyta: „Spróbujesz?”", a: ["Pani.", "Nina.", "Ala."] }
  ],
  events: ["Jacek żongluje piłeczkami.", "Ala gra na flecie.", "Bliźniaki pokazują sztuczkę z kartami.", "Nina tańczy, a klasa klaszcze.", "Wszyscy jedzą pizzę na przerwie."] },

{ id: "p2-trening", level: 2, topic: "sport", title: "Trening przed meczem",
  body: `Drużyna Sokoły ma w sobotę ważny mecz. W środę trener zarządził trening. Co ćwiczyli? Podania, strzały na bramkę, bieganie między pachołkami i rzuty z autu. Zuzia jest najmniejsza w drużynie, ale biega najszybciej. Trener ustawił ją na skrzydle. „Pamiętaj, nie trzymaj piłki za długo. Podawaj!” powtarzał. Pod koniec treningu rozegrali krótki mecz: niebiescy przeciwko żółtym. Zuzia dostała piłkę, minęła dwóch obrońców i podała do Olka. Olek strzelił gola. Czy trener był zadowolony? Bardzo. Powiedział, że to była najlepsza akcja dnia. Po treningu wszyscy pili wodę i rozmawiali o sobocie. Zuzia wracała do domu zmęczona, ale szczęśliwa. W głowie wciąż słyszała słowa trenera: „Podawaj!”.`,
  questions: [
    { type: "fakt", q: "Jak nazywa się drużyna Zuzi?", a: ["Sokoły.", "Orły.", "Lwy."] },
    { type: "szczegół", q: "Kto strzelił gola w krótkim meczu?", a: ["Olek.", "Zuzia.", "Trener."] },
    { type: "dlaczego", q: "Dlaczego trener ustawił Zuzię na skrzydle?", a: ["Bo biega najszybciej.", "Bo jest najwyższa.", "Bo lubi stać w bramce."] },
    { type: "słowo", q: "Co znaczy „minęła dwóch obrońców”?", a: ["Przebiegła obok nich z piłką.", "Przywitała się z nimi.", "Podała im piłkę."] },
    { type: "znak", q: "Które zdanie z tekstu jest pytaniem?", a: ["Czy trener był zadowolony?", "Olek strzelił gola.", "Podawaj!"] }
  ],
  events: ["Trener zarządza trening w środę.", "Drużyna ćwiczy podania i strzały.", "Zuzia mija obrońców i podaje do Olka.", "Olek strzela gola.", "Zuzia wraca do domu zmęczona i szczęśliwa."] },

{ id: "p2-krakow", level: 2, topic: "podróże", title: "Tydzień w Krakowie",
  body: `Babcia Hani mieszka w Krakowie. Hania pojechała do niej na tydzień. Co widziała? Smoka wawelskiego, który co kilka minut zieje ogniem, kolorowe kamienice na rynku, gołębie, których jest tam więcej niż ludzi, i hejnalistę na wieży kościoła. Hejnał gra się cztery razy, w cztery strony świata. Hania zapytała babcię, dlaczego melodia urywa się nagle. Babcia opowiedziała legendę o strażniku, którego trafiła strzała. W czwartek padało, więc poszły do muzeum. Tam Hania zobaczyła prawdziwą zbroję rycerza. Była ciężka jak rower! Wieczorami babcia piekła obwarzanki. W niedzielę Hania wracała pociągiem. W plecaku miała obwarzanek dla mamy, pocztówkę ze smokiem i pełno wspomnień. Postanowiła napisać o wszystkim w szkolnym zeszycie.`,
  questions: [
    { type: "fakt", q: "Gdzie mieszka babcia Hani?", a: ["W Krakowie.", "W Warszawie.", "Nad morzem."] },
    { type: "szczegół", q: "Ile razy gra się hejnał?", a: ["Cztery.", "Dwa.", "Sześć."] },
    { type: "dlaczego", q: "Dlaczego w czwartek poszły do muzeum?", a: ["Bo padał deszcz.", "Bo babcia tam pracuje.", "Bo Hania chciała zobaczyć smoka."] },
    { type: "słowo", q: "Co znaczy „zieje ogniem”?", a: ["Wypuszcza ogień z paszczy.", "Gasi ogień wodą.", "Boi się ognia."] },
    { type: "znak", q: "Które zdanie ma na końcu wykrzyknik?", a: ["Była ciężka jak rower!", "W niedzielę Hania wracała pociągiem.", "Co widziała?"] }
  ],
  events: ["Hania przyjeżdża do babci.", "Ogląda smoka i słucha hejnału.", "W czwartek zwiedza muzeum ze zbroją.", "Babcia piecze obwarzanki.", "Hania wraca pociągiem z pocztówką."] },

{ id: "p2-noc", level: 2, topic: "dzik", title: "Nocna przygoda Bączka",
  body: `Pewnej nocy Bączek nie mógł zasnąć. Księżyc świecił jasno, a w brzuchu burczało. Dzik wstał i poszedł szukać przekąski. Co znalazł? Najpierw grzyb, ale był gorzki. Potem orzech, ale był twardy. W końcu zobaczył coś, co pachniało cudownie. To był kosz piknikowy, zapomniany przez ludzi. W środku leżały bułki, ser i ogórki. Bączek zjadł wszystko. Nagle usłyszał trzask gałązki. Kto to? Z ciemności wyszedł lis. „To mój kosz!” warknął lis. Bączek przestraszył się tak bardzo, że puścił ogromnego bąka. Lis zatkał nos i uciekł. Dzik wrócił do legowiska dumny i najedzony. Rano opowiedział o wszystkim mamie. Mama westchnęła: „Bączek, jedzenie ludzi nie jest dla dzików”. Ale po cichu też się śmiała.`,
  questions: [
    { type: "fakt", q: "Co Bączek znalazł na końcu?", a: ["Kosz piknikowy.", "Jabłoń.", "Rzekę."] },
    { type: "szczegół", q: "Co było w koszu?", a: ["Bułki, ser i ogórki.", "Jabłka i gruszki.", "Ciasto i sok."] },
    { type: "dlaczego", q: "Dlaczego lis uciekł?", a: ["Bo Bączek puścił ogromnego bąka.", "Bo zobaczył ludzi.", "Bo bał się księżyca."] },
    { type: "słowo", q: "Co to jest „legowisko”?", a: ["Miejsce, gdzie zwierzę śpi.", "Rzeka w lesie.", "Koszyk z jedzeniem."] },
    { type: "znak", q: "Kto mówi: „To mój kosz!”?", a: ["Lis.", "Bączek.", "Mama."] }
  ],
  events: ["Bączek nie może zasnąć i idzie szukać jedzenia.", "Próbuje gorzkiego grzyba i twardego orzecha.", "Znajduje kosz piknikowy i zjada wszystko.", "Przychodzi lis i warczy.", "Lis ucieka, a Bączek wraca do legowiska.", "Rano mama wzdycha i się śmieje."] },

{ id: "p2-karmnik", level: 2, topic: "przyroda", title: "Ptasia stołówka",
  body: `Zimą ptakom trudno znaleźć jedzenie. Dlatego klasa trzecia zbudowała karmnik. Z czego? Z deseczek, które przyniósł tata Michała, i gwoździ ze szkolnego warsztatu. Pani przybiła daszek, a dzieci pomalowały ściany na zielono. Karmnik zawisł na drzewie za oknem klasy. Co sypali ptakom? Słonecznik, proso i kawałki jabłka. Chleba nie, bo szkodzi ptakom. Pierwszego dnia nikt nie przyleciał. Drugiego dnia też nie. Czy ptaki w ogóle znajdą karmnik? Trzeciego dnia na daszku usiadła sikorka. Potem przyleciały dwie następne, a za nimi gruby gil z czerwonym brzuszkiem. Dzieci obserwowały ptaki na każdej przerwie i zapisywały w tabeli, kto przyleciał. Do wiosny naliczyły siedem różnych gatunków. Najczęściej przylatywały sikorki, a najrzadziej dzięcioł.`,
  questions: [
    { type: "fakt", q: "Kto przyniósł deseczki na karmnik?", a: ["Tata Michała.", "Pani.", "Dziadek Ani."] },
    { type: "szczegół", q: "Na jaki kolor dzieci pomalowały karmnik?", a: ["Na zielono.", "Na czerwono.", "Na niebiesko."] },
    { type: "dlaczego", q: "Dlaczego dzieci nie sypały chleba?", a: ["Bo chleb szkodzi ptakom.", "Bo nie miały chleba.", "Bo pani zapomniała."] },
    { type: "słowo", q: "Co to jest „gatunek”?", a: ["Rodzaj zwierząt, na przykład sikorka albo gil.", "Jedzenie dla ptaków.", "Pora roku."] },
    { type: "znak", q: "Które zdanie z tekstu jest pytaniem?", a: ["Czy ptaki w ogóle znajdą karmnik?", "Pierwszego dnia nikt nie przyleciał.", "Chleba nie, bo szkodzi ptakom."] }
  ],
  events: ["Klasa buduje karmnik z deseczek.", "Dzieci sypią ziarna i czekają.", "Trzeciego dnia przylatuje sikorka.", "Przylatuje gil z czerwonym brzuszkiem.", "Do wiosny dzieci liczą siedem gatunków."] },

{ id: "p2-rower", level: 2, topic: "sport", title: "Rowerowa wyprawa",
  body: `W niedzielę Tomek i tata wybrali się na rower. Plan był prosty: dojechać do młyna nad rzeką i wrócić przed obiadem. Co zabrali? Dwie butelki wody, banany, pompkę i aparat. Pierwsze kilometry szły łatwo, droga była płaska. Potem zaczęła się górka. Tomek pedałował z całych sił, a tata jechał obok i zachęcał: „Jeszcze trochę, już widać szczyt!”. Na górze odpoczęli i zjedli banany. Zjazd był najprzyjemniejszy. Wiatr gwizdał w uszach, a koła szumiały. Przy młynie Tomek zrobił zdjęcie wielkiego koła wodnego. Czy obróciło się chociaż raz? Nie, młyn już dawno nie działa. W drodze powrotnej złapali gumę. Na szczęście mieli pompkę. Tata załatał dętkę w dziesięć minut. Do domu dojechali spóźnieni, ale obiad czekał. Mama tylko spytała: „Ile kilometrów?”. „Dwadzieścia dwa!” odpowiedział Tomek z dumą.`,
  questions: [
    { type: "fakt", q: "Dokąd pojechali Tomek i tata?", a: ["Do młyna nad rzeką.", "Do lasu.", "Na stadion."] },
    { type: "szczegół", q: "Ile kilometrów przejechali?", a: ["Dwadzieścia dwa.", "Dwanaście.", "Trzydzieści."] },
    { type: "dlaczego", q: "Dlaczego spóźnili się na obiad?", a: ["Bo złapali gumę i tata łatał dętkę.", "Bo zgubili drogę.", "Bo za długo jedli banany."] },
    { type: "słowo", q: "Co znaczy „złapać gumę”?", a: ["Przedziurawić oponę w rowerze.", "Znaleźć gumę do żucia.", "Zepsuć pompkę."] },
    { type: "znak", q: "Kto mówi: „Jeszcze trochę, już widać szczyt!”?", a: ["Tata.", "Tomek.", "Mama."] }
  ],
  events: ["Tomek i tata pakują wodę, banany i pompkę.", "Wjeżdżają na górkę i jedzą banany.", "Zjeżdżają do młyna i robią zdjęcie.", "Łapią gumę, tata łata dętkę.", "Wracają spóźnieni na obiad."] },

{ id: "p2-festyn", level: 2, topic: "śpiew", title: "Śpiewająca klasa",
  body: `Pani od muzyki ogłosiła: „Za dwa tygodnie zaśpiewamy na szkolnym festynie”. Klasa wybrała piosenkę o wędrującej chmurce. Kto śpiewał najgłośniej? Oczywiście Bartek, ale nie zawsze w rytm. Kto najciszej? Kasia, choć miała najładniejszy głos. Pani podzieliła klasę na dwie grupy: pierwsza śpiewała zwrotki, druga refren. Ćwiczyli na każdej lekcji, a czasem na przerwie. Bartek nauczył się słuchać innych, a Kasia śpiewać głośniej. W dniu festynu na boisku stała scena. Dzieci miały niebieskie koszulki i papierowe chmurki na głowach. Kiedy wyszły na scenę, Kasia poczuła, jak drżą jej kolana. Czy da radę? Pani kiwnęła głową i zagrała pierwsze nuty. Klasa zaśpiewała równo, głośno i wesoło. Rodzice klaskali najdłużej ze wszystkich. Po występie Kasia powiedziała: „Chcę zaśpiewać jeszcze raz!”.`,
  questions: [
    { type: "fakt", q: "O czym była piosenka?", a: ["O wędrującej chmurce.", "O słoniu.", "O szkole."] },
    { type: "szczegół", q: "Jakiego koloru koszulki miały dzieci?", a: ["Niebieskie.", "Białe.", "Zielone."] },
    { type: "dlaczego", q: "Dlaczego Kasi drżały kolana?", a: ["Bo bała się występu na scenie.", "Bo było zimno.", "Bo biegła na scenę."] },
    { type: "słowo", q: "Co to jest „refren”?", a: ["Część piosenki, która się powtarza.", "Instrument muzyczny.", "Nazwa festynu."] },
    { type: "znak", q: "Kto mówi: „Chcę zaśpiewać jeszcze raz!”?", a: ["Kasia.", "Bartek.", "Pani."] }
  ],
  events: ["Pani ogłasza występ na festynie.", "Klasa ćwiczy piosenkę w dwóch grupach.", "W dniu festynu dzieci wychodzą na scenę.", "Klasa śpiewa, rodzice klaszczą.", "Kasia chce zaśpiewać jeszcze raz."] },

// ---------- Poziom 3: 150–200 słów, prosty dialog z myślnikami ----------
{ id: "p3-dentysta", level: 3, topic: "dzik", title: "Bączek u dentysty",
  body: `Bączek obudził się z bólem zęba. Kieł po lewej stronie pulsował jak mały bębenek. Mama spojrzała mu w pysk i zdecydowała:
– Idziemy do bobra. Bóbr zna się na zębach.
Bóbr mieszkał nad strumieniem w domku z gałęzi. Na drzwiach wisiała tabliczka: „Dentysta. Proszę pukać ogonem”. Bączek nie miał takiego ogona jak bóbr, więc zapukał kopytkiem.
– Wejść! – zawołał bóbr. – Co boli?
– Kieł – jęknął dzik. – Chyba za dużo żołędzi.
Bóbr zajrzał do pyska przez lupę zrobioną z kropli wody.
– Widzę. Mały kamyk utknął między zębami. Zaraz go wyjmę.
– Będzie szczypać? – spytał Bączek.
– Trochę – przyznał bóbr i wyjął kamyk jednym ruchem.
Bączek z ulgi puścił bąka tak głośnego, że z półki spadł słoik z miodem.
– Przepraszam – powiedział zawstydzony.
– Nic nie szkodzi – zaśmiał się bóbr. – Pacjenci często tak robią. A teraz rada: po żołędziach płucz pysk wodą ze strumienia.
Bączek obiecał. W drodze powrotnej mama kupiła mu w sklepiku u wiewiórki miękką gruszkę. Zjadł ją ostrożnie, drugą stroną pyska.`,
  questions: [
    { type: "fakt", q: "Do kogo mama zaprowadziła Bączka?", a: ["Do bobra.", "Do sowy.", "Do wiewiórki."] },
    { type: "szczegół", q: "Co spadło z półki?", a: ["Słoik z miodem.", "Lupa.", "Tabliczka."] },
    { type: "dlaczego", q: "Dlaczego Bączek zapukał kopytkiem, a nie ogonem?", a: ["Bo nie ma takiego ogona jak bóbr.", "Bo drzwi były otwarte.", "Bo bóbr go o to poprosił."] },
    { type: "słowo", q: "Co znaczy „puścił bąka z ulgi”?", a: ["Zrobił to, bo przestało boleć i poczuł się lepiej.", "Zrobił to ze strachu.", "Zrobił to z głodu."] },
    { type: "znak", q: "Kto pyta: „Będzie szczypać?”", a: ["Bączek.", "Bóbr.", "Mama."] }
  ],
  events: ["Bączek budzi się z bólem kła.", "Mama prowadzi go do bobra.", "Bóbr wyjmuje kamyk spomiędzy zębów.", "Bączek z ulgi puszcza bąka i spada słoik.", "Mama kupuje mu gruszkę u wiewiórki."] },

{ id: "p3-piornik", level: 3, topic: "szkoła", title: "Zaginiony piórnik",
  body: `W poniedziałek Marysia nie znalazła w plecaku piórnika. Sprawdziła kieszenie, zajrzała pod ławkę, a nawet do kosza na śmieci.
– Może zostawiłaś go w domu? – spytała Ewa.
– Nie, pamiętam, że wkładałam go rano – odpowiedziała Marysia. – Był czerwony, z żółtym zamkiem.
Na pierwszej lekcji pożyczyła ołówek od Ewy. Na drugiej długopis od Kuby. Na trzeciej, na plastyce, kredki od całej klasy. Każdy dał po jednej, więc miała ich dwadzieścia.
Na dużej przerwie Marysia poszła do pani woźnej.
– Znalazł się czerwony piórnik?
– Czerwony nie – powiedziała pani woźna. – Ale w autobusie szkolnym ktoś zostawił niebieski.
Marysia wróciła do klasy zmartwiona. Wtedy Kuba zapytał:
– A może sprawdzisz w worku na kapcie?
Marysia pobiegła do szatni. W worku, między kapciami, leżał czerwony piórnik z żółtym zamkiem. Wrzuciła go tam rano, kiedy się spieszyła.
– Znalazłam! – krzyknęła na cały korytarz.
Oddała kredki, ołówek i długopis. Ewa się uśmiechnęła:
– Następnym razem sprawdź najpierw worek, a potem kosz na śmieci.`,
  questions: [
    { type: "fakt", q: "Gdzie był piórnik?", a: ["W worku na kapcie.", "W autobusie szkolnym.", "W koszu na śmieci."] },
    { type: "szczegół", q: "Jaki kolor miał zamek piórnika?", a: ["Żółty.", "Czerwony.", "Niebieski."] },
    { type: "dlaczego", q: "Dlaczego Marysia miała na plastyce dwadzieścia kredek?", a: ["Bo każdy z klasy pożyczył jej po jednej.", "Bo kupiła nowe.", "Bo pani jej dała."] },
    { type: "słowo", q: "Co znaczy „zmartwiona”?", a: ["Smutna, bo ma kłopot.", "Wesoła.", "Zmęczona po biegu."] },
    { type: "znak", q: "Kto mówi: „A może sprawdzisz w worku na kapcie?”", a: ["Kuba.", "Ewa.", "Pani woźna."] }
  ],
  events: ["Marysia nie znajduje piórnika w plecaku.", "Pożycza ołówek, długopis i kredki.", "Pyta panią woźną o piórnik.", "Kuba radzi sprawdzić worek na kapcie.", "Marysia znajduje piórnik w szatni.", "Oddaje pożyczone rzeczy."] },

{ id: "p3-turniej", level: 3, topic: "sport", title: "Pierwszy turniej",
  body: `Drużyna Liski pojechała na swój pierwszy turniej piłkarski. Hala była ogromna, a trybuny pełne rodziców. Lena zawiązała buty podwójnie, żeby się nie rozwiązały.
– Boisz się? – spytał Igor.
– Trochę – odpowiedziała Lena. – Ale bardziej się cieszę.
Pierwszy mecz Liski przegrały dwa do zera. Trener nie krzyczał. Usiadł z nimi na ławce i powiedział:
– Patrzyliście na piłkę, a nie na kolegów. Podnieście głowy.
W drugim meczu Lena podniosła głowę i zobaczyła Igora samego pod bramką. Podała. Igor strzelił. Jeden do zera! Potem rywale wyrównali, ale w ostatniej minucie Lena przejęła piłkę, pobiegła przez całe boisko i strzeliła w długi róg. Dwa do jednego dla Lisków.
Trzeci mecz skończył się remisem. Liski zajęły trzecie miejsce i dostały brązowe medale.
W autobusie wszyscy śpiewali. Igor spytał:
– Pamiętasz, jak się bałaś?
– Nie pamiętam – zaśmiała się Lena i podniosła medal do okna, żeby błysnął w słońcu.`,
  questions: [
    { type: "fakt", q: "Jak nazywa się drużyna Leny?", a: ["Liski.", "Sokoły.", "Orły."] },
    { type: "szczegół", q: "Jakie miejsce zajęły Liski?", a: ["Trzecie.", "Pierwsze.", "Ostatnie."] },
    { type: "dlaczego", q: "Dlaczego drużyna przegrała pierwszy mecz?", a: ["Bo zawodnicy patrzyli na piłkę, a nie na kolegów.", "Bo Lena miała rozwiązane buty.", "Bo trener krzyczał."] },
    { type: "słowo", q: "Co znaczy „rywale wyrównali”?", a: ["Strzelili gola i wynik stał się równy.", "Wyszli z boiska.", "Wygrali mecz."] },
    { type: "znak", q: "Kto pyta: „Boisz się?”", a: ["Igor.", "Lena.", "Trener."] }
  ],
  events: ["Liski przyjeżdżają do ogromnej hali.", "Przegrywają pierwszy mecz dwa do zera.", "Trener radzi podnieść głowy.", "Lena podaje do Igora, Igor strzela.", "Lena strzela w ostatniej minucie.", "Drużyna dostaje brązowe medale."] },

{ id: "p3-los", level: 3, topic: "przyroda", title: "Spotkanie z łosiem",
  body: `Rodzina Zielińskich spędzała wakacje nad jeziorem. Pewnego ranka tata obudził Julkę i Wojtka bardzo wcześnie.
– Wstawajcie. Idziemy na mokradła, zanim zrobi się gorąco.
Szli ścieżką przez las. Mgła wisiała nad trawą jak mleko. Wojtek ziewał i narzekał:
– Po co wstawać o piątej? Nic tu nie ma.
– Cicho – szepnęła Julka. – Coś chrupie.
Zatrzymali się. Za krzakami stał łoś. Był wyższy od taty, miał długie nogi i wielką głowę. Spokojnie skubał liście wierzby. Dzieci wstrzymały oddech. Łoś spojrzał na nich, poruszył uszami i wrócił do jedzenia.
– Nie ruszajcie się – powiedział cicho tata. – On wie, że tu jesteśmy.
Stali tak kilka minut. Potem łoś odszedł w mgłę, bezszelestnie, choć był ogromny.
W drodze powrotnej Wojtek już nie ziewał.
– Jutro też wstajemy o piątej? – spytał.
– Jutro o czwartej – zażartował tata.
Julka narysowała łosia w zeszycie przyrodniczym i napisała pod spodem: „Wyższy od taty, cichszy od kota”.`,
  questions: [
    { type: "fakt", q: "Kogo rodzina spotkała na mokradłach?", a: ["Łosia.", "Dzika.", "Jelenia."] },
    { type: "szczegół", q: "Co jadł łoś?", a: ["Liście wierzby.", "Trawę.", "Jagody."] },
    { type: "dlaczego", q: "Dlaczego tata obudził dzieci tak wcześnie?", a: ["Żeby pójść na mokradła, zanim zrobi się gorąco.", "Bo trzeba było jechać do domu.", "Bo Wojtek chrapał."] },
    { type: "słowo", q: "Co znaczy „bezszelestnie”?", a: ["Bez żadnego dźwięku.", "Bardzo szybko.", "Z głośnym tupaniem."] },
    { type: "znak", q: "Kto mówi: „Jutro o czwartej”?", a: ["Tata.", "Wojtek.", "Julka."] }
  ],
  events: ["Tata budzi dzieci o piątej.", "Idą przez las we mgle.", "Julka słyszy chrupanie.", "Rodzina obserwuje łosia.", "Łoś odchodzi w mgłę.", "Julka rysuje łosia w zeszycie."] },

{ id: "p3-balet", level: 3, topic: "dzik", title: "Bączek i balet",
  body: `Na leśnej polanie sarna Róża otworzyła szkołę baletu. Przyszły zające, wiewiórki, nawet jeden borsuk. Bączek też przyszedł, choć koledzy się śmiali.
– Dziki nie tańczą – powiedział borsuk. – Dziki ryją.
– A ja spróbuję – odparł Bączek.
Pierwsza lekcja była trudna. Róża pokazywała, jak stać na jednej nodze. Zające stały bez trudu. Wiewiórki też. Bączek zachwiał się i usiadł na borsuku.
– Przepraszam – mruknął.
Druga lekcja: obrót. Bączek obrócił się tak szybko, że puścił bąka, a liście na polanie zawirowały jak w tańcu.
– To był piękny efekt! – zachwyciła się Róża. – Zrób to jeszcze raz, ale bez hałasu.
Bączek ćwiczył codziennie przy strumieniu. Po dwóch tygodniach umiał stać na jednej nodze, obracać się i nawet podskakiwać. Na pokazie końcowym wystąpił w wianku ze stokrotek. Kiedy skończył, borsuk klaskał najgłośniej.
– Dziki jednak tańczą – przyznał.
– Dziki wszystko mogą – odpowiedział Bączek. – Tylko trzeba ćwiczyć.`,
  questions: [
    { type: "fakt", q: "Kto otworzył szkołę baletu?", a: ["Sarna Róża.", "Borsuk.", "Wiewiórka."] },
    { type: "szczegół", q: "W czym wystąpił Bączek na pokazie?", a: ["W wianku ze stokrotek.", "W kapeluszu.", "W szaliku."] },
    { type: "dlaczego", q: "Dlaczego Bączek usiadł na borsuku?", a: ["Bo zachwiał się, stojąc na jednej nodze.", "Bo chciał zrobić mu na złość.", "Bo był zmęczony."] },
    { type: "słowo", q: "Co znaczy „zachwiał się”?", a: ["Stracił równowagę.", "Zasnął.", "Zaśpiewał."] },
    { type: "znak", q: "Kto mówi: „Dziki nie tańczą”?", a: ["Borsuk.", "Bączek.", "Róża."] }
  ],
  events: ["Róża otwiera szkołę baletu.", "Bączek przewraca się na pierwszej lekcji.", "Bączek robi obrót i liście wirują.", "Bączek ćwiczy dwa tygodnie przy strumieniu.", "Występuje na pokazie, borsuk klaszcze."] },

{ id: "p3-gory", level: 3, topic: "podróże", title: "Deszczowy dzień w górach",
  body: `Ala i jej starsza siostra Weronika pojechały z rodzicami w góry. Pierwszego dnia od rana lało.
– Nie będzie wędrówki – westchnęła mama, patrząc w okno.
– To co będziemy robić? – spytała Ala.
Tata wyciągnął mapę miasteczka i wskazał palcem.
– Muzeum z drewnianą chatą, potem gorąca czekolada, a jak przestanie padać, to kolejka na Gubałówkę.
W muzeum przewodnik pokazał im stare narty, dłuższe niż tata, i buty z drewnianą podeszwą. Weronika zapytała, czy górale naprawdę tak jeździli.
– Jeździli i nie narzekali – odpowiedział przewodnik.
Po południu chmury rozeszły się jak zasłona. Rodzina wjechała kolejką na górę. Z góry widać było całe miasteczko, a w dali ośnieżone szczyty.
– Które to Giewont? – spytała Ala.
– Ten, który wygląda jak śpiący rycerz – pokazała Weronika.
Ala patrzyła długo. Rzeczywiście, góra miała kształt leżącego olbrzyma z hełmem. Zrobiła zdjęcie telefonem mamy. Wieczorem w pensjonacie napisała pocztówkę do babci: „Padało, a i tak było super”.`,
  questions: [
    { type: "fakt", q: "Dokąd pojechała rodzina Ali?", a: ["W góry.", "Nad morze.", "Do Krakowa."] },
    { type: "szczegół", q: "Co pili po muzeum?", a: ["Gorącą czekoladę.", "Herbatę.", "Sok."] },
    { type: "dlaczego", q: "Dlaczego rano nie było wędrówki?", a: ["Bo od rana padał deszcz.", "Bo Ala była chora.", "Bo kolejka była zepsuta."] },
    { type: "słowo", q: "Co znaczy „chmury rozeszły się jak zasłona”?", a: ["Chmury zniknęły i zrobiło się jasno.", "Zaczęło mocniej padać.", "Zrobiło się ciemno."] },
    { type: "znak", q: "Kto pyta: „Które to Giewont?”", a: ["Ala.", "Weronika.", "Tata."] }
  ],
  events: ["Rano pada deszcz, mama wzdycha.", "Rodzina zwiedza muzeum ze starymi nartami.", "Chmury się rozchodzą.", "Wjazd kolejką na Gubałówkę.", "Ala robi zdjęcie Giewontu.", "Wieczorem Ala pisze pocztówkę do babci."] },

// ---------- Poziom 4: 200–270 słów, zdania złożone, wykrzyknienia ----------
{ id: "p4-wyscig", level: 4, topic: "dzik", title: "Wielki wyścig po lesie",
  body: `Co roku, kiedy liście zaczynają żółknąć, zwierzęta z Dębowego Lasu urządzają wielki wyścig. Trasa prowadzi od starego dębu, przez strumień, wokół mrowiska i z powrotem. W tym roku zgłosili się: zając Szybki, lis Rudy, sarna Róża, jeż Kolczak i, ku zdziwieniu wszystkich, dzik Bączek.
– Ty? – zdziwił się zając. – Przecież ty biegasz jak worek żołędzi!
– Zobaczymy – odpowiedział Bączek spokojnie, choć serce biło mu jak młotek.
Sowa dała znak skrzydłem i wszyscy ruszyli. Zając od razu wysunął się na prowadzenie. Lis biegł tuż za nim, a sarna, lekka jak piórko, przeskakiwała kamienie. Jeż toczył się powoli, lecz bez przerwy. Bączek biegł ostatni, ale się nie zatrzymywał.
Przy strumieniu zając przeskoczył wodę jednym susem i nagle stanął! Na drugim brzegu rosła młoda marchewka, której nie mógł sobie odmówić. Lis, ciekawski jak zawsze, zaczął tropić zapach myszy i skręcił w zupełnie inną stronę. Sarna przestraszyła się własnego cienia i schowała się w krzakach.
Kto został na trasie? Jeż i Bączek. Przy mrowisku dzik dogonił jeża.
– Biegnij, ja i tak nie zdążę – powiedział Kolczak uprzejmie.
Bączek pobiegł. Zobaczył dąb, metę i tłum kibiców. Z wysiłku puścił bąka tak potężnego, że przyspieszył jak rakieta! Wpadł na metę pierwszy, a chwilę później, jeszcze śmiejąc się, odebrał wianek zwycięzcy.
– Nie najszybszy wygrywa – ogłosiła sowa – tylko ten, kto nie zbacza z drogi.`,
  questions: [
    { type: "fakt", q: "Kto wygrał wyścig?", a: ["Bączek.", "Zając.", "Jeż."] },
    { type: "szczegół", q: "Co zatrzymało zająca przy strumieniu?", a: ["Młoda marchewka.", "Mysz.", "Własny cień."] },
    { type: "dlaczego", q: "Dlaczego lis zszedł z trasy?", a: ["Bo zaczął tropić zapach myszy.", "Bo się zmęczył.", "Bo bał się wody."] },
    { type: "słowo", q: "Co znaczy „jednym susem”?", a: ["Jednym dużym skokiem.", "Bardzo powoli.", "Po kolei."] },
    { type: "znak", q: "Które zdanie wypowiada zając?", a: ["Przecież ty biegasz jak worek żołędzi!", "Biegnij, ja i tak nie zdążę.", "Nie najszybszy wygrywa."] }
  ],
  events: ["Zwierzęta zgłaszają się do wyścigu.", "Sowa daje znak, zając prowadzi.", "Zając zatrzymuje się przy marchewce.", "Lis tropi mysz, sarna chowa się w krzakach.", "Bączek dogania jeża przy mrowisku.", "Bączek wpada na metę pierwszy."] },

{ id: "p4-biblioteka", level: 4, topic: "szkoła", title: "Tajemnica szkolnej biblioteki",
  body: `W szkolnej bibliotece od tygodnia działo się coś dziwnego. Książki, które wieczorem stały równo na półkach, rano leżały na podłodze. Pani bibliotekarka, pani Jadwiga, była bezradna.
– Może to duch? – zaproponował Olek, który uwielbiał straszne historie.
– Duchy nie czytają książek o dinozaurach – odparła Zosia. – A spadają tylko te.
Zosia miała rację! Na podłodze lądowały wyłącznie książki z dolnej półki, z działu przyrodniczego. Dzieci postanowiły rozwiązać zagadkę. Po lekcjach, za zgodą pani Jadwigi, zostały w bibliotece i schowały się za regałem. Czekały długo. Olek dwa razy prawie zasnął, a Zosia zjadła wszystkie krakersy.
Kiedy za oknem zrobiło się ciemno, usłyszały szmer. Zza kaloryfera wysunął się mały, szary pyszczek z długimi wąsami. Mysz! Wspięła się na dolną półkę, oparła łapki o książkę o dinozaurach i zepchnęła ją na podłogę. Potem zeskoczyła, obwąchała okładkę i zaczęła skubać róg kartki.
– Ona je papier! – szepnął Olek. – To mysz, która lubi dinozaury!
Następnego dnia dzieci opowiedziały o wszystkim pani Jadwidze. Nikt nie zastawił pułapki. Pan woźny znalazł dziurę za kaloryferem i ją zalepił, a mysz, jak twierdzi Olek, wyprowadziła się do piwnicy, gdzie leżą stare gazety. Książki o dinozaurach wróciły na półkę, tym razem na najwyższą.
– Zagadka rozwiązana – powiedziała pani Jadwiga. – Zasługujecie na nagrodę. Każde z was może wybrać jedną książkę na własność.
Zosia wybrała atlas zwierząt. A Olek? Oczywiście książkę o duchach.`,
  questions: [
    { type: "fakt", q: "Kto zrzucał książki z półki?", a: ["Mysz.", "Duch.", "Pan woźny."] },
    { type: "szczegół", q: "Jakie książki spadały na podłogę?", a: ["Książki o dinozaurach z dolnej półki.", "Baśnie z górnej półki.", "Atlasy zwierząt."] },
    { type: "dlaczego", q: "Dlaczego Zosia nie wierzyła w ducha?", a: ["Bo spadały tylko książki o dinozaurach, a duchy ich nie czytają.", "Bo pani Jadwiga tak powiedziała.", "Bo w szkole nie wolno wierzyć w duchy."] },
    { type: "słowo", q: "Co znaczy „była bezradna”?", a: ["Nie wiedziała, co zrobić.", "Była bardzo zła.", "Była zmęczona."] },
    { type: "znak", q: "Kto mówi: „Ona je papier!”?", a: ["Olek.", "Zosia.", "Pani Jadwiga."] }
  ],
  events: ["Książki rano leżą na podłodze.", "Zosia zauważa, że spadają tylko książki o dinozaurach.", "Dzieci chowają się za regałem.", "Mysz zrzuca książkę i skubie kartkę.", "Pan woźny zalepia dziurę za kaloryferem.", "Dzieci wybierają książki w nagrodę."] },

{ id: "p4-pociag", level: 4, topic: "podróże", title: "Pociąg do morza",
  body: `Kiedy Natalia dowiedziała się, że pojadą nad morze pociągiem, a nie samochodem, podskoczyła z radości tak wysoko, że uderzyła głową w lampę. Pociąg! Prawdziwy, z przedziałami, z wagonem restauracyjnym i oknami, przez które widać pół Polski!
Na dworcu panował tłok. Tata trzymał bilety w zębach, bo w rękach miał walizki, a mama liczyła dzieci: Natalia, Krzyś, Natalia, Krzyś. Pociąg wjechał na peron z takim hukiem, że Krzyś zasłonił uszy.
W przedziale siedziała już starsza pani z koszykiem, z którego wystawał koci ogon.
– Kot nazywa się Pierożek – przedstawiła go pani. – Jedzie do wnuków.
Pierożek spał przez całe Mazowsze. Natalia patrzyła w okno: pola, lasy, rzeka, znów pola, krowy, miasteczko z kościołem, jeziora. Krzyś zasnął po godzinie, a tata po dwóch. Mama czytała książkę. Natalia nie zasnęła ani na minutę, ponieważ bała się, że przegapi morze.
– Kiedy będzie widać morze? – pytała co kwadrans.
– Jak zobaczysz mewy – odpowiadała pani od kota.
I rzeczywiście: najpierw pojawiła się jedna mewa, potem pięć, potem całe stado. Powietrze zmieniło zapach, a za oknem, między sosnami, błysnęła niebieska kreska. Morze!
– Widzę! – krzyknęła Natalia, budząc tatę, Krzysia i Pierożka.
Pierożek ziewnął, spojrzał w okno i, jak twierdzi Natalia, też się uśmiechnął. Pociąg zwolnił, w głośniku ktoś powiedział nazwę stacji, a Natalia już stała przy drzwiach z plecakiem na ramionach. Wakacje się zaczęły.`,
  questions: [
    { type: "fakt", q: "Czym rodzina jechała nad morze?", a: ["Pociągiem.", "Samochodem.", "Autobusem."] },
    { type: "szczegół", q: "Jak nazywał się kot starszej pani?", a: ["Pierożek.", "Kluska.", "Mruczek."] },
    { type: "dlaczego", q: "Dlaczego Natalia nie zasnęła w pociągu?", a: ["Bo bała się, że przegapi morze.", "Bo kot miauczał.", "Bo było za głośno."] },
    { type: "słowo", q: "Co znaczy „panował tłok”?", a: ["Było bardzo dużo ludzi.", "Było pusto.", "Było cicho."] },
    { type: "znak", q: "Kto mówi: „Jak zobaczysz mewy”?", a: ["Starsza pani z kotem.", "Mama.", "Tata."] }
  ],
  events: ["Natalia dowiaduje się o podróży pociągiem.", "Rodzina wsiada do pociągu na zatłoczonym dworcu.", "W przedziale poznają panią z kotem Pierożkiem.", "Krzyś i tata zasypiają.", "Za oknem pojawiają się mewy.", "Natalia widzi morze i budzi wszystkich."] },

// ---------- Poziom 5: 270–350 słów, kilku bohaterów, zmiana miejsca ----------
{ id: "p5-biblioteka", level: 5, topic: "dzik", title: "Bączek ratuje bibliotekę",
  body: `W Dębowym Lesie była tylko jedna biblioteka: dziupla w starej lipie, którą prowadziła sowa Mądrala. Książki stały tam na gałązkach jak na półkach, a czytelnicy, od mrówki po jelenia, przychodzili w każdy wtorek. Bączek był najwierniejszym czytelnikiem. Czytał wszystko: o grzybach, o gwiazdach, nawet o gotowaniu, choć nigdy niczego nie ugotował.
Pewnego wtorku sowa siedziała przed dziuplą ze smutną miną.
– Biblioteka się kończy – powiedziała. – Lipa usycha. Leśniczy mówi, że na wiosnę ją zetną.
– A książki? – przestraszył się Bączek.
– Nie mam dokąd ich przenieść. Dziupla w dębie jest za mała, a w sośnie mieszka kuna, która gryzie okładki.
Bączek wrócił do domu i nie mógł jeść. Nawet żołędzie smakowały jak kamienie. Myślał całą noc, a nad ranem wpadł na pomysł.
Rano zwołał wszystkich na polanę: zające, wiewiórki, jeża Kolczaka, lisa Rudego, a nawet borsuka, który zwykle spał do południa.
– Zbudujemy nową bibliotekę – oznajmił. – Pod korzeniami wielkiego buka jest sucha jama. Ja ją powiększę, bo ryć umiem najlepiej w lesie. Bobry zrobią półki. Wiewiórki przeniosą książki. Zające będą pilnować wejścia przed kuną.
– A ja? – spytał lis.
– Ty, Rudy, masz najlepszy nos. Znajdziesz każdą książkę, którą ktoś zgubi.
Praca trwała trzy tygodnie. Bączek rył od świtu do zmroku. Kiedy był zmęczony, puszczał bąka, a ziemia wylatywała z jamy sama. Bobry ścinały gałęzie i układały półki. Wiewiórki biegały tam i z powrotem, a w zębach niosły książki, bardzo ostrożnie, żeby nie zgiąć kartek. Nawet kuna przyszła popatrzeć, ale zające tupnęły, i sobie poszła.
W pierwszy wtorek wiosny sowa Mądrala przecięła wstążkę ze źdźbła trawy.
– Otwieram Bibliotekę pod Bukiem! – ogłosiła, a cały las zaklaskał, zatupał i zaszumiał.
Bączek wypożyczył pierwszą książkę. Była o gotowaniu. Tym razem postanowił naprawdę coś ugotować. Zupę z żołędzi, oczywiście.`,
  questions: [
    { type: "fakt", q: "Gdzie była stara biblioteka?", a: ["W dziupli w starej lipie.", "Pod bukiem.", "W sośnie."] },
    { type: "szczegół", q: "Jak długo trwała budowa nowej biblioteki?", a: ["Trzy tygodnie.", "Trzy dni.", "Całą zimę."] },
    { type: "dlaczego", q: "Dlaczego sowa nie mogła przenieść książek do sosny?", a: ["Bo mieszka tam kuna, która gryzie okładki.", "Bo sosna jest za wysoka.", "Bo sosna też usycha."] },
    { type: "słowo", q: "Co znaczy „oznajmił”?", a: ["Powiedział wszystkim ważną rzecz.", "Zapytał cicho.", "Zaśpiewał."] },
    { type: "znak", q: "Kto pyta: „A ja?”", a: ["Lis Rudy.", "Borsuk.", "Bączek."] }
  ],
  events: ["Sowa mówi, że lipa usycha.", "Bączek nie może jeść i myśli całą noc.", "Bączek zwołuje zwierzęta i dzieli zadania.", "Zwierzęta budują bibliotekę pod bukiem.", "Sowa przecina wstążkę.", "Bączek wypożycza książkę o gotowaniu."] },

{ id: "p5-swiatlo", level: 5, topic: "szkoła", title: "Dzień, w którym zgasło światło",
  body: `Zaczęło się zwyczajnie. Ósma rano, klasa trzecia, lekcja matematyki. Pani Kowalska rysowała na tablicy ułamki, a Franek liczył, ile minut zostało do przerwy. Nagle światło zamrugało i zgasło. Komputer na biurku pani zapiszczał i zamilkł. W klasie zrobiło się szaro, bo za oknem padał śnieg.
– Spokojnie – powiedziała pani. – Pewnie coś z prądem w całej szkole.
Po chwili do klasy zajrzał pan dyrektor.
– Nie ma prądu w całej dzielnicy. Autobusy nie jeżdżą, więc rodzice przyjadą po was dopiero po południu. Do tego czasu zostajemy w klasach.
– Bez komputerów? – jęknął Franek. – Bez światła? Co będziemy robić?
Pani Kowalska uśmiechnęła się tajemniczo, podeszła do szafy i wyjęła coś, czego dzieci nigdy nie widziały: pudełko z napisem „Na czarną godzinę”. W środku były świece w słoikach, talia kart, gra planszowa z wytartymi kostkami i gruba książka z baśniami.
– Dzisiaj szkoła będzie taka jak za czasów mojej babci – oznajmiła.
Najpierw zapalili świece i ustawili je na parapetach. Potem pani podzieliła klasę na grupy. Jedna grała w karty, druga w planszówkę, a trzecia słuchała, jak Ola czyta baśń o szklanej górze. Ola czytała z przerwami, bo przy świecach litery były mniejsze niż zwykle, ale nikt jej nie poganiał.
W południe zrobiło się zimno, więc wszyscy założyli kurtki. Pani przyniosła z pokoju nauczycielskiego termos z herbatą. Pili z jednego kubka, po kolei, i śmiali się, że to jak na biwaku.
Franek, który rano narzekał, teraz prowadził w planszówce i wcale nie chciał, żeby prąd wrócił. Ale wrócił. O drugiej po południu lampy zamrugały, komputer pani zabrzęczał, a w głośnikach odezwał się dzwonek.
– No i po przygodzie – westchnął Franek.
– Przygody można powtarzać – powiedziała pani i schowała pudełko do szafy. – Nawet przy świetle.
Kiedy przyjechała mama Franka, zapytała, czy bardzo się nudził.
– Nudziłem? – zdziwił się Franek. – To był najlepszy dzień w tym roku!`,
  questions: [
    { type: "fakt", q: "Co zgasło w klasie na lekcji matematyki?", a: ["Światło i komputer.", "Tablica.", "Dzwonek."] },
    { type: "szczegół", q: "Co było w pudełku „Na czarną godzinę”?", a: ["Świece, karty, gra planszowa i książka z baśniami.", "Latarki i koce.", "Kanapki i soki."] },
    { type: "dlaczego", q: "Dlaczego rodzice mieli przyjechać dopiero po południu?", a: ["Bo bez prądu nie jeździły autobusy.", "Bo padał śnieg.", "Bo pani tak zdecydowała."] },
    { type: "słowo", q: "Co znaczy „na czarną godzinę”?", a: ["Na trudny moment, kiedy coś się psuje.", "Na noc.", "Na lekcję plastyki."] },
    { type: "znak", q: "Kto mówi: „Przygody można powtarzać”?", a: ["Pani Kowalska.", "Franek.", "Mama Franka."] }
  ],
  events: ["Na lekcji matematyki gaśnie światło.", "Dyrektor mówi, że nie ma prądu w całej dzielnicy.", "Pani wyjmuje pudełko „Na czarną godzinę”.", "Dzieci grają i słuchają baśni przy świecach.", "Wszyscy piją herbatę z termosu.", "O drugiej wraca prąd."] }
];

// Pary „przecinek zmienia sens”: podane znaczenie, trzeba wybrać zdanie, które je wyraża (pierwsze — prawidłowe).
window.DZIK_COMMAS = [
  { meaning: "Bączek zaprasza dzieci do stołu.", a: ["Jedzmy, dzieci!", "Jedzmy dzieci!"], joke: "Bez przecinka dzik chciałby zjeść dzieci. Na szczęście Bączek woli żołędzie." },
  { meaning: "Ktoś prosi, żeby na niego poczekać.", a: ["Nie, czekaj na mnie.", "Nie czekaj na mnie."], joke: "Jeden przecinek i zając albo czeka, albo odchodzi bez Bączka." },
  { meaning: "Ktoś grzecznie odmawia.", a: ["Nie, dziękuję.", "Nie dziękuję."], joke: "Bez przecinka to niegrzeczne: „nie powiem dziękuję”." },
  { meaning: "Ktoś pozwala wejść.", a: ["Nie, możesz wejść.", "Nie możesz wejść."], joke: "Przecinek otwiera drzwi. Bez niego drzwi zostają zamknięte." },
  { meaning: "Ktoś każe przestać jeść.", a: ["Nie jedz tego!", "Nie, jedz tego!"], joke: "Z przecinkiem Bączek dostaje pozwolenie na wszystko, co znajdzie w lesie." },
  { meaning: "Ktoś mówi, że wcale się nie boi.", a: ["Nie boję się!", "Nie, boję się!"], joke: "Jeden przecinek zmienia odważnego dzika w strachliwego." },
  { meaning: "Ktoś woła Bączka, żeby pobiegł do lasu.", a: ["Bączek, biegnij do lasu!", "Bączek biegnie do lasu."], joke: "Przecinek po imieniu znaczy, że do kogoś mówimy." },
  { meaning: "Ktoś przyznaje, że druga osoba się myli.", a: ["Nie ma racji.", "Nie, ma racji."], joke: "Z przecinkiem przyznajemy komuś rację. Bez przecinka — wcale nie." },
  { meaning: "Ktoś zakazuje iść w tamtą stronę.", a: ["Nie idź tam.", "Nie, idź tam."], joke: "Bez przecinka to zakaz, z przecinkiem — zachęta." },
  { meaning: "Ktoś mówi, że lubi lisa.", a: ["Nie, lubię go.", "Nie lubię go."], joke: "Przecinek potrafi zmienić niechęć w sympatię." }
];

// Błysk słów: zestawy po 4 podobne słowa (pierwsze — pokazywane). Poziom określa długość.
window.DZIK_FLASH = {
  short: [["kot", "kos", "kok", "kąt"], ["las", "lis", "los", "lak"], ["dom", "dym", "dam", "tom"], ["mak", "rak", "tak", "bak"], ["sok", "sos", "sęk", "syk"], ["nos", "noc", "los", "nas"], ["ser", "sen", "set", "sęk"], ["lew", "lek", "len", "lep"], ["pies", "piec", "pięć", "pisk"], ["mysz", "myśl", "mysi", "masz"], ["kura", "kora", "góra", "kara"], ["rower", "rowek", "równo", "rowy"], ["dzik", "dzika", "dziki", "dziób"], ["ptak", "park", "pak", "płat"]],
  long: [["szkoła", "szkoda", "szkło", "szkolny"], ["jabłko", "jabłoń", "jabłka", "jadło"], ["bramka", "branka", "brama", "bratek"], ["morze", "może", "marzę", "morzę"], ["zamek", "zanik", "zamki", "zamiar"], ["chmura", "chmury", "chmurka", "chrupka"], ["piłka", "półka", "pałka", "piłki"], ["lampa", "lama", "lampka", "łapa"], ["taniec", "tańce", "tanio", "tani"], ["śnieg", "śnieżka", "śniegu", "śniony"], ["gruszka", "grusza", "gruszki", "groszki"], ["wiosna", "wiosła", "wiosnę", "wiosny"], ["czapka", "czapki", "czaszka", "czapla"], ["bączek", "bąbel", "bączki", "bąk"], ["książka", "księżyc", "książki", "książę"]]
};

// Ciekawostki o dzikach — Bączek opowiada jedną po każdej sesji.
window.DZIK_FACTS = [
  "Dziki świetnie pływają. Potrafią przepłynąć szeroką rzekę.",
  "Małe dziki to warchlaki. Mają na grzbiecie jasne paski jak piżama.",
  "Dzik ma słaby wzrok, ale znakomity węch. Wyczuje żołędzia pod liśćmi.",
  "Dziki tarzają się w błocie, żeby się ochłodzić i pozbyć owadów.",
  "Dorosły dzik może ważyć więcej niż stu kilogramów. To tyle, co dwóch dorosłych ludzi.",
  "Dziki jedzą prawie wszystko: żołędzie, korzenie, grzyby, owady, a nawet myszy.",
  "Dzik biega szybko, nawet czterdzieści kilometrów na godzinę. Tyle, co samochód w mieście.",
  "Stado dzików nazywa się wataha. Prowadzi je najstarsza i najmądrzejsza samica.",
  "Ryjem dzik potrafi przekopać ziemię jak mały pług.",
  "Dziki są najbardziej ruchliwe o zmierzchu i w nocy. W dzień chętnie śpią.",
  "Świnia domowa pochodzi od dzika. To dalecy kuzyni.",
  "Dziki prawie się nie pocą, dlatego w upał szukają błota i wody.",
  "Kły dzika rosną przez całe życie.",
  "Dorosły dzik ma czterdzieści cztery zęby. Człowiek ma trzydzieści dwa.",
  "Dziki mają świetny słuch. Czasem słyszą człowieka, zanim on je zobaczy.",
  "Zimą dziki nie zapadają w sen zimowy. Szukają jedzenia pod śniegiem."
];
