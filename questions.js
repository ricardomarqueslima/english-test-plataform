const questions = [
    {
        id: 1,
        type: 'multiple-choice',
        question: "Na frase 'It is impossible for God to lie,' o que o prefixo 'im-' em 'impossible' significa?",
        hint: "Pense no que 'possible' significa. O prefixo muda a palavra para o seu oposto.",
        options: [
            { text: "not", correct: true, explanation: "Correto. O prefixo 'im-' é uma variação de 'in-', que significa 'não'. Ele nega o significado da palavra raiz." },
            { text: "before", correct: false, explanation: "Incorreto. O prefixo para 'antes' é tipicamente 'pre-', como em 'pre-intermediate'." },
            { text: "again", correct: false, explanation: "Incorreto. O prefixo para 'de novo' é 're-', como em 'reread' (reler)." },
            { text: "inside", correct: false, explanation: "Incorreto. Embora 'in-' possa significar 'dentro' (como em 'inhale'), neste contexto, ele significa 'não'." },
            { text: "with", correct: false, explanation: "Incorreto. O prefixo para 'com' é frequentemente 'co-' ou 'con-', como em 'co-worker'." }
        ]
    },
    {
        id: 2,
        type: 'drag-drop',
        question: "Complete a palavra: Qual sufixo você pode adicionar ao verbo 'govern' para formar um substantivo para a pessoa que governa?",
        hint: "Este sufixo é comum para profissões ou papéis, como 'doctor' ou 'actor'.",
        baseWord: "govern",
        correctSuffix: "or",
        options: ["or", "ment", "tion", "able", "ly"],
        explanation: "Correto. Adicionar '-or' a 'govern' cria 'governor' (governador), a pessoa que governa."
    },
    {
        id: 3,
        type: 'fill-blank',
        question: "Complete a frase: God _______ all things for the good of those who love him.",
        hint: "A frase descreve uma verdade geral que está sempre acontecendo.",
        correctAnswer: "works",
        options: ["work", "works", "working", "worked", "will work"],
        explanation: "Correto. O 'Simple Present' ('works') é usado para verdades gerais e fatos. O sujeito 'God' é singular, então o verbo precisa do '-s'."
    },
    {
        id: 4,
        type: 'multiple-choice',
        question: "A palavra 'righteousness' na Bíblia frequentemente significa...",
        hint: "Está relacionada à justiça e a seguir a lei de Deus.",
        options: [
            { text: "being morally right or justifiable", correct: true, explanation: "Correto. Este é o significado central de 'righteousness' — aderir a um padrão do que é certo, justo e bom." },
            { text: "being very rich", correct: false, explanation: "Incorreto. Riqueza não está diretamente relacionada ao conceito de retidão moral." },
            { text: "having a lot of power", correct: false, explanation: "Incorreto. Uma pessoa pode ter poder e não ser justa. Os conceitos são diferentes." },
            { text: "being famous", correct: false, explanation: "Incorreto. Fama é sobre ser conhecido, o que não tem conexão com ser moralmente reto." },
            { text: "feeling sad", correct: false, explanation: "Incorreto. Isso descreve uma emoção, enquanto 'righteousness' descreve um estado ou caráter moral." }
        ]
    },
    {
        id: 5,
        type: 'multiple-choice',
        question: "Leia o texto de Gênesis 1:1-2: 'In the beginning, God created the heavens and the earth. The earth was formless and empty, and darkness was over the surface of the deep. And the Spirit of God was hovering over the waters.' O que estava 'hovering over the waters'?",
        hint: "Procure pela palavra 'hovering' no texto e veja qual sujeito está conectado a ela.",
        relatedText: "Gênesis 1:1-2: 'In the beginning, God created the heavens and the earth. The earth was formless and empty, and darkness was over the surface of the deep. And the Spirit of God was hovering over the waters.'",
        options: [
            { text: "The Spirit of God", correct: true, explanation: "Correto. O texto afirma explicitamente: 'And the Spirit of God was hovering over the waters.'" },
            { text: "The heavens", correct: false, explanation: "Incorreto. O texto diz que Deus criou os céus, mas não que eles estavam pairando sobre as águas." },
            { text: "The earth", correct: false, explanation: "Incorreto. O texto descreve a terra como 'sem forma e vazia', não como pairando." },
            { text: "Darkness", correct: false, explanation: "Incorreto. O texto diz que a escuridão estava 'sobre a face do abismo', mas não que estava 'pairando'." },
            { text: "The deep", correct: false, explanation: "Incorreto. A escuridão estava sobre a face do abismo, mas o abismo em si não foi descrito como pairando." }
        ]
    },
    {
        id: 6,
        type: 'multiple-choice',
        question: "No texto de Gênesis 1:1-2, o que a palavra 'formless' mais provavelmente significa?",
        hint: "O texto também diz que a terra estava 'empty' (vazia), o que é uma pista.",
        relatedText: "Gênesis 1:1-2: 'In the beginning, God created the heavens and the earth. The earth was formless and empty, and darkness was over the surface of the deep. And the Spirit of God was hovering over the waters.'",
        options: [
            { text: "without a clear shape or structure", correct: true, explanation: "Correto. A palavra 'formless' combina 'form' (forma) e '-less' (sem), e o contexto da terra ser 'vazia' apoia este significado." },
            { text: "very large", correct: false, explanation: "Incorreto. O tamanho da terra não é discutido nesta descrição específica." },
            { text: "full of light", correct: false, explanation: "Incorreto. O texto menciona explicitamente 'darkness' (escuridão), então este significado é o oposto do contexto." },
            { text: "very beautiful", correct: false, explanation: "Incorreto. A descrição 'sem forma e vazia' sugere uma falta de ordem, não de beleza." },
            { text: "made of rock", correct: false, explanation: "Incorreto. O texto não especifica do que a terra era feita, apenas sua falta de forma." }
        ]
    },
    {
        id: 7,
        type: 'multiple-choice',
        question: "Leia o texto do Salmo 23:1-3: 'The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside quiet waters. He restores my soul.' De acordo com este texto, o que o 'shepherd' (pastor) provê?",
        hint: "Pense no que 'green pastures' (pastos verdejantes) e 'quiet waters' (águas tranquilas) representam.",
        relatedText: "Salmo 23:1-3: 'The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside quiet waters. He restores my soul.'",
        options: [
            { text: "Rest and peace", correct: true, explanation: "Correto. As imagens de 'pastos verdejantes' e 'águas tranquilas' são símbolos de paz, provisão e descanso." },
            { text: "Money and gold", correct: false, explanation: "Incorreto. O texto usa linguagem simbólica relacionada à natureza e ao cuidado, não à riqueza material." },
            { text: "A big house", correct: false, explanation: "Incorreto. O cenário descrito é ao ar livre, em pastos, não em uma casa." },
            { text: "Many friends", correct: false, explanation: "Incorreto. Embora um pastor cuide de um rebanho, o foco desta passagem está no cuidado pessoal provido, não na amizade com outros." },
            { text: "Important work", correct: false, explanation: "Incorreto. A passagem enfatiza o descanso ('lie down') e a restauração, não o trabalho." }
        ]
    },
    {
        id: 8,
        type: 'fill-blank',
        question: "Complete: No contexto do Salmo 23, a frase 'I shall not want' significa 'I will have ______ I need'.",
        hint: "Um bom pastor cuida completamente de suas ovelhas.",
        correctAnswer: "everything",
        options: ["something", "nothing", "everything", "anything", "little"],
        explanation: "Correto. Como o Senhor é o pastor do autor, todas as suas necessidades essenciais são atendidas. Portanto, não lhe faltará nada de importante.",
        relatedText: "Salmo 23:1-3: 'The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside quiet waters. He restores my soul.'"
    },
    {
        id: 9,
        type: 'multiple-choice',
        question: "Baseado no texto: 'The chief end of man is to glorify God and to enjoy him forever. To 'glorify' God means to give honor and praise to Him. This is the main purpose for why people exist.' O que significa 'to glorify' a Deus?",
        hint: "O texto dá uma definição direta da palavra.",
        relatedText: "'The chief end of man is to glorify God and to enjoy him forever. To 'glorify' God means to give honor and praise to Him. This is the main purpose for why people exist.'",
        options: [
            { text: "To give honor and praise to Him", correct: true, explanation: "Correto. O texto fornece uma definição clara: 'To 'glorify' God means to give honor and praise to Him.'" },
            { text: "To build a large church", correct: false, explanation: "Incorreto. Embora um templo possa ser usado para honrar a Deus, esta ação específica não é a definição de 'glorify'." },
            { text: "To sing loudly", correct: false, explanation: "Incorreto. Cantar é uma forma de louvar, mas 'glorify' é um conceito mais amplo de dar honra, que pode ser feito de muitas maneiras." },
            { text: "To understand everything about Him", correct: false, explanation: "Incorreto. O texto não conecta glorificar com compreensão completa, mas com honra e louvor." },
            { text: "To ask Him for things", correct: false, explanation: "Incorreto. Pedir coisas é orar ou suplicar, o que é diferente do ato de dar louvor e honra." }
        ]
    },
    {
        id: 10,
        type: 'multiple-choice',
        question: "Qual é a ideia principal deste texto teológico: 'The chief end of man is to glorify God and to enjoy him forever...'?",
        hint: "Olhe para a primeira frase que fala sobre o 'chief end of man' (fim principal do homem).",
        relatedText: "'The chief end of man is to glorify God and to enjoy him forever. To 'glorify' God means to give honor and praise to Him. This is the main purpose for why people exist.'",
        options: [
            { text: "The main purpose of human life is to honor God.", correct: true, explanation: "Correto. O texto afirma explicitamente que o 'fim principal' ou 'propósito principal' do homem é glorificar (honrar) e desfrutar de Deus." },
            { text: "People should only enjoy life.", correct: false, explanation: "Incorreto. Esta é apenas metade da ideia principal. Omite o propósito primário de glorificar a Deus." },
            { text: "God needs praise from people.", correct: false, explanation: "Incorreto. O texto descreve o propósito da humanidade; não afirma que Deus tem necessidade de louvor." },
            { text: "Theology is very difficult to understand.", correct: false, explanation: "Incorreto. O texto é uma declaração de uma crença teológica, não um comentário sobre a dificuldade da teologia em si." },
            { text: "People exist by accident.", correct: false, explanation: "Incorreto. Isso contradiz a ideia principal de que as pessoas existem para um 'fim principal' ou propósito específico." }
        ]
    },
    {
        id: 11,
        type: 'drag-drop',
        question: "Arraste a nacionalidade correta para quem vem do 'Brazil':",
        hint: "Veja a lista de países e nacionalidades no material de vocabulário.",
        correctAnswer: "Brazilian",
        options: ["Brazilian", "Brazilish", "Brazilese", "Brazili", "Brazilean"],
        explanation: "Correto! A nacionalidade para quem vem do Brasil é 'Brazilian'."
    },
    {
        id: 12,
        type: 'fill-blank',
        question: "Como se escreve o número '1,200' em inglês? Escreva por extenso: ______ thousand, ______ hundred",
        hint: "Lembre-se das palavras para 'thousand' e 'hundred'.",
        correctAnswer: "one thousand, two hundred",
        options: ["one thousand, two hundred", "one thousand, three hundred", "two thousand, one hundred", "one thousand, one hundred", "one thousand, five hundred"],
        explanation: "Correto. Esta é a forma padrão de escrever 1.200 por extenso."
    },
    {
        id: 13,
        type: 'multiple-choice',
        question: "Qual é o número ordinal para '3'?",
        hint: "Os primeiros três números ordinais são irregulares.",
        options: [
            { text: "third", correct: true, explanation: "Correto. O número ordinal para 3 é 'third' (3rd)." },
            { text: "threeth", correct: false, explanation: "Incorreto. A partir do 4, a maioria dos números ordinais termina em '-th', mas 3 é uma exceção." },
            { text: "thirth", correct: false, explanation: "Incorreto. A grafia está incorreta." },
            { text: "tree", correct: false, explanation: "Incorreto. 'Tree' significa árvore." },
            { text: "the third", correct: false, explanation: "Incorreto. Embora frequentemente usemos 'the' antes de números ordinais, a palavra em si é apenas 'third'." }
        ]
    },
    {
        id: 14,
        type: 'multiple-choice',
        question: "De acordo com o vocabulário de tempo, o que é um 'decade'?",
        hint: "Pense em quantos anos há em uma década.",
        options: [
            { text: "a period of 10 years", correct: true, explanation: "Correto. 'Decade' é uma palavra para um período de 10 anos." },
            { text: "a period of 100 years", correct: false, explanation: "Incorreto. Um período de 100 anos é um 'century'." },
            { text: "a period of 1,000 years", correct: false, explanation: "Incorreto. Um período de 1.000 anos é um 'millennium'." },
            { text: "two weeks", correct: false, explanation: "Incorreto. Duas semanas podem ser chamadas de 'fortnight' no Reino Unido." },
            { text: "a period of 5 years", correct: false, explanation: "Incorreto. Não há uma palavra comum em inglês para um período de 5 anos." }
        ]
    },
    {
        id: 15,
        type: 'drag-drop',
        question: "Na lista de rotinas diárias, qual expressão significa 'passar roupa'? Arraste a resposta correta:",
        hint: "A palavra para 'ferro de passar' em inglês é 'iron'.",
        correctAnswer: "to iron a shirt",
        options: ["to iron a shirt", "to wash your face", "to make the bed", "to dry your hair", "to clear the table"],
        explanation: "Correto. 'To iron' significa passar, e 'shirt' é camisa. A expressão geral é 'to do the ironing'."
    },
    {
        id: 16,
        type: 'multiple-choice',
        question: "Qual o oposto da palavra 'holy' (santo) usada no texto de Romanos?",
        hint: "Muitos opostos em inglês são formados com o prefixo 'un-'.",
        options: [
            { text: "unholy", correct: true, explanation: "Correto. O prefixo 'un-' é comumente usado em inglês para indicar negação ou oposição. 'Unholy' (profano) é o antônimo direto de 'holy'." },
            { text: "disholy", correct: false, explanation: "Incorreto. O prefixo 'dis-' indica negação, mas não é usado com 'holy'." },
            { text: "imholy", correct: false, explanation: "Incorreto. O prefixo 'im-' indica negação, mas não é usado com 'holy'." },
            { text: "deholy", correct: false, explanation: "Incorreto. Este não é um prefixo padrão para negação em inglês." },
            { text: "nonholy", correct: false, explanation: "Incorreto. O prefixo 'non-' indica ausência, mas 'unholy' é a forma correta para o oposto." }
        ]
    },
    {
        id: 17,
        type: 'multiple-choice',
        question: "Na frase 'renewing of your mind', a palavra 'renewing' funciona como:",
        hint: "A palavra descreve o 'ato de renovar' e está agindo como o sujeito da frase.",
        options: [
            { text: "Noun (gerund)", correct: true, explanation: "Correto. Nesta construção ('the renewing of...'), o gerúndio ('renewing') funciona como um substantivo, nomeando o ato de renovar." },
            { text: "Verb", correct: false, explanation: "Incorreto. Embora derive de um verbo, aqui não está agindo como o verbo principal da oração." },
            { text: "Adjective", correct: false, explanation: "Incorreto. Não está modificando um substantivo, mas sim agindo como um." },
            { text: "Adverb", correct: false, explanation: "Incorreto. Não está modificando um verbo, adjetivo ou outro advérbio." },
            { text: "Preposition", correct: false, explanation: "Incorreto. Preposições (como 'of', 'in', 'on') mostram a relação entre as palavras." }
        ]
    },
    {
        id: 18,
        type: 'multiple-choice',
        question: "Se você quisesse encontrar rapidamente o nome 'Mr. Whiskers' em um texto longo, qual técnica de leitura seria mais eficiente?",
        hint: "Você não precisa ler tudo, apenas procurar por uma informação específica.",
        options: [
            { text: "Scanning", correct: true, explanation: "Correto. 'Scanning' é a técnica de leitura rápida que visa encontrar informações específicas (palavras-chave, nomes, datas) em um texto, sem lê-lo por completo." },
            { text: "Skimming", correct: false, explanation: "Incorreto. 'Skimming' seria usado para ter uma ideia geral do texto, não para encontrar um detalhe específico." },
            { text: "Reading aloud", correct: false, explanation: "Incorreto. Ler em voz alta geralmente diminui a velocidade e não é uma técnica específica para encontrar informações." },
            { text: "Translating", correct: false, explanation: "Incorreto. Traduzir o texto levaria muito tempo e não é uma técnica de leitura rápida." },
            { text: "Summarizing", correct: false, explanation: "Incorreto. Para resumir, você precisaria primeiro ler e entender o texto." }
        ]
    },
    {
        id: 19,
        type: 'multiple-choice',
        question: "Leia o texto 'A Colorful Year with Mr. Tim'. Que erro engraçado o Sr. Tim cometeu no verão?",
        hint: "Lembre-se do que aconteceu quando ele foi à praia.",
        relatedText: "From 'A Colorful Year with Mr. Tim' - Summer section: Summer is Mr. Tim's favorite season. He loves ice cream and blue skies. One hot day, he went to the beach. But something funny happened. He went to the beach wearing a wool sweater instead of a T-shirt! His friends laughed and helped him change.",
        options: [
            { text: "He went to the beach wearing a wool sweater.", correct: true, explanation: "Correto! O texto diz: 'He went to the beach wearing a wool sweater instead of a T-shirt!'" },
            { text: "He put on one black shoe and one white shoe.", correct: false, explanation: "Incorreto. Esse erro aconteceu no inverno, não no verão." },
            { text: "He jumped into a pile of leaves and disappeared.", correct: false, explanation: "Incorreto. Isso aconteceu no outono." },
            { text: "He talked to his cat about the sky.", correct: false, explanation: "Incorreto. Ele fez isso na primavera, e não foi um erro." },
            { text: "He drank hot chocolate.", correct: false, explanation: "Incorreto. Ele bebeu chocolate quente no inverno." }
        ]
    },
    {
        id: 20,
        type: 'fill-blank',
        question: "No texto sobre o Sr. Tim, qual material era o seu cachecol de inverno? Complete: ______ scarf",
        hint: "O texto descreve o que ele usa para se aquecer no frio.",
        correctAnswer: "wool",
        options: ["cotton", "silk", "wool", "leather", "plastic"],
        explanation: "Correto. O texto diz que ele se enrolou em um 'thick wool scarf' (cachecol grosso de lã).",
        relatedText: "From 'A Colorful Year with Mr. Tim' - Winter section: When winter came, he wrapped himself in a thick wool scarf and put on two different colored gloves."
    },
    {
        id: 21,
        type: 'multiple-choice',
        question: "Qual é a estação favorita do Sr. Tim?",
        hint: "O texto menciona explicitamente qual estação ele mais ama.",
        relatedText: "From 'A Colorful Year with Mr. Tim': Summer is Mr. Tim's favorite season. He loves ice cream and blue skies.",
        options: [
            { text: "Summer", correct: true, explanation: "Correto. O texto afirma: 'Summer is Mr. Tim's favorite season.'" },
            { text: "Winter", correct: false, explanation: "Incorreto. Ele se prepara para o inverno, mas não é dito que é a sua favorita." },
            { text: "Spring", correct: false, explanation: "Incorreto. Ele gosta da primavera, mas não é a sua favorita." },
            { text: "Autumn (Fall)", correct: false, explanation: "Incorreto. Ele se diverte no outono, mas não é a sua estação favorita." },
            { text: "The text does not say.", correct: false, explanation: "Incorreto. O texto diz explicitamente qual é a sua estação favorita." }
        ]
    },
    {
        id: 22,
        type: 'multiple-choice',
        question: "Por que os amigos do Sr. Tim riram dele no verão?",
        hint: "Pense na roupa que ele estava usando e no clima.",
        relatedText: "From 'A Colorful Year with Mr. Tim' - Summer section: One hot day, he went to the beach. But something funny happened. He went to the beach wearing a wool sweater instead of a T-shirt! His friends laughed and helped him change.",
        options: [
            { text: "Because he was wearing winter clothes in the hot sun.", correct: true, explanation: "Correto. Eles riram porque ele estava vestido para o inverno ('wearing a wool sweater') no calor do verão." },
            { text: "Because he told a funny joke.", correct: false, explanation: "Incorreto. Ele não contou uma piada; a situação em si era engraçada." },
            { text: "Because he fell in the ocean.", correct: false, explanation: "Incorreto. O texto não diz que ele caiu no oceano." },
            { text: "Because he was eating ice cream too fast.", correct: false, explanation: "Incorreto. O texto menciona que ele ama sorvete, mas não que ele o comeu rápido demais." },
            { text: "Because he was talking to his cat.", correct: false, explanation: "Incorreto. Ele falou com o gato na primavera, não no verão." }
        ]
    },
    {
        id: 23,
        type: 'drag-drop',
        question: "Qual palavra melhor descreve a personalidade do Sr. Tim? Arraste a resposta:",
        hint: "Pense em como ele age ao longo do ano.",
        correctAnswer: "silly and fun",
        options: ["silly and fun", "serious and quiet", "sad and lonely", "angry and rude", "boring and normal"],
        explanation: "Correto. A última frase resume sua personalidade: 'Mr. Tim always makes life fun, colorful, and a little silly!'"
    },
    {
        id: 24,
        type: 'fill-blank',
        question: "O que os amigos do Sr. Tim ouviram quando ele estava escondido na pilha de folhas? Complete: ______ voice",
        hint: "Os amigos procuraram por ele e finalmente ouviram algo.",
        correctAnswer: "his own",
        options: ["a strange", "his own", "a loud", "a quiet", "a friend's"],
        explanation: "Correto. O texto diz que os amigos dele 'heard a voice from under the leaves', que era a voz do próprio Sr. Tim dizendo 'I'm here!'",
        relatedText: "From 'A Colorful Year with Mr. Tim' - Autumn section: He jumped into a big pile of colorful leaves. His friends looked for him for 10 minutes! Finally, they heard a voice from under the leaves: 'I'm here!'"
    },
    {
        id: 25,
        type: 'multiple-choice',
        question: "Qual destas cores NÃO é mencionada como uma cor das flores na primavera?",
        hint: "O texto lista três cores de flores que o Sr. Tim vê.",
        relatedText: "From 'A Colorful Year with Mr. Tim' - Spring section: In spring, Mr. Tim loves to see flowers. He sees pink, yellow, and purple flowers everywhere. The grass is green, and the sky is blue.",
        options: [
            { text: "blue", correct: true, explanation: "Correto. O texto menciona flores 'pink, yellow, and purple'. 'Blue' é mencionado em referência ao céu ('blue sky')." },
            { text: "pink", correct: false, explanation: "Incorreto. 'Pink' é uma das cores das flores mencionadas." },
            { text: "yellow", correct: false, explanation: "Incorreto. 'Yellow' é uma das cores das flores mencionadas." },
            { text: "purple", correct: false, explanation: "Incorreto. 'Purple' é uma das cores das flores mencionadas." },
            { text: "green", correct: false, explanation: "Incorreto. 'Green' é mencionado em referência à grama ('green grass')." }
        ]
    }
];
