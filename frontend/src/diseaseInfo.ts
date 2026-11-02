export type DiseaseProfile = { title:string; symptoms:string; causes:string; treatment:string; prevention:string; inspect:string };

export const diseaseInformation: Record<string, Record<"en"|"hi"|"mr", DiseaseProfile>> = {
  "Pepper__bell___Bacterial_spot": {
    "en": {
      "title": "Pepper bacterial spot",
      "symptoms": "Small dark, water-soaked or raised leaf spots may turn brown and develop yellow halos. Fruit can develop raised, scabby lesions; severe infections cause yellowing and leaf drop.",
      "causes": "Caused by Xanthomonas bacteria. It can arrive on infected seed or transplants and spread through splashing water, wet-plant handling and contaminated tools.",
      "treatment": "Remove badly affected leaves when plants are dry and dispose of debris. Avoid overhead irrigation and handling wet foliage. Use clean transplants; ask local extension staff before using a bactericide because resistance and product registration vary.",
      "prevention": "Use disease-free seed and transplants, rotate away from pepper-family hosts, sanitize tools, maintain spacing and inspect plants regularly.",
      "inspect": "Check both leaf surfaces, young shoots and fruit. Fungal leaf spots, spray injury and physical damage can look similar."
    },
    "hi": {
      "title": "शिमला मिर्च का जीवाणु धब्बा",
      "symptoms": "पत्तियों पर छोटे गहरे, पानी से भीगे या उभरे धब्बे बनते हैं। बाद में वे भूरे-काले हो सकते हैं और पीला घेरा दिख सकता है। फल पर खुरदरे धब्बे और गंभीर स्थिति में पत्तियाँ झड़ सकती हैं।",
      "causes": "यह Xanthomonas जीवाणु से होता है। संक्रमित बीज या पौध से शुरुआत हो सकती है और बारिश के छींटों, ऊपर से सिंचाई, गीले पौधों तथा दूषित औजारों से फैलता है।",
      "treatment": "सूखे मौसम में बहुत प्रभावित पत्तियाँ हटाएँ और अवशेष साफ करें। ऊपर से सिंचाई और गीले पौधों को छूने से बचें। साफ पौध सामग्री लें। जीवाणुनाशक के उपयोग से पहले स्थानीय कृषि अधिकारी से सलाह लें।",
      "prevention": "रोगमुक्त बीज-पौध लें, मिर्च कुल की फसलों के साथ लगातार खेती से बचें, औजार साफ रखें, उचित दूरी दें और नियमित निरीक्षण करें।",
      "inspect": "पत्तियों के दोनों ओर, नई शाखाओं और फलों को देखें। फफूंद के धब्बे, स्प्रे से जलन और चोट जैसे लक्षण भी मिलते-जुलते हो सकते हैं।"
    },
    "mr": {
      "title": "ढोबळी मिरचीवरील जिवाणूजन्य ठिपके",
      "symptoms": "पानांवर लहान काळे, पाणचट किंवा उंच ठिपके दिसतात. नंतर ते तपकिरी-काळे होऊन भोवती पिवळे वलय दिसू शकते. फळांवर खरबरीत ठिपके येतात व तीव्र प्रादुर्भावात पाने गळतात.",
      "causes": "Xanthomonas जिवाणूंमुळे रोग होतो. संक्रमित बियाणे किंवा रोपांमधून सुरुवात होऊन पावसाचे तुषार, वरून पाणी देणे, ओली झाडे व दूषित अवजारांमुळे प्रसार होतो.",
      "treatment": "कोरड्या हवेत बाधित पाने काढा व अवशेष स्वच्छ करा. वरून पाणी देणे आणि ओली झाडे हाताळणे टाळा. निरोगी रोपे वापरा. जिवाणूनाशक वापरण्यापूर्वी स्थानिक कृषी सल्ला घ्या.",
      "prevention": "रोगमुक्त बियाणे-रोपे वापरा, मिरचीवर्गीय पिकांची सलग लागवड टाळा, अवजारे स्वच्छ ठेवा, योग्य अंतर ठेवा आणि नियमित पाहणी करा.",
      "inspect": "पानांच्या दोन्ही बाजू, नवीन फांद्या व फळे तपासा. बुरशीजन्य ठिपके, फवारणीची जळजळ किंवा इजा यांसारखी लक्षणेही दिसू शकतात."
    }
  },
  "Pepper__bell___healthy": {
    "en": {
      "title": "Pepper leaf appears healthy",
      "symptoms": "The model selected the healthy pepper class. This image shows no strong pattern from the model’s known disease labels, but early symptoms may be missed.",
      "causes": "Healthy is a classifier category, not proof that the whole plant or field is disease-free.",
      "treatment": "Continue scouting several plants and inspect new growth and leaf undersides. Remove dead plant material and avoid unnecessary pesticide applications. Seek expert advice if symptoms appear.",
      "prevention": "Use clean seed and transplants, balanced irrigation and nutrition, adequate spacing, weed control and regular scouting.",
      "inspect": "Check for new lesions, yellowing, curling, wilting or unusual growth. Nutrient stress, sunscald and water stress can resemble disease."
    },
    "hi": {
      "title": "शिमला मिर्च का पत्ता स्वस्थ दिखाई देता है",
      "symptoms": "मॉडल ने स्वस्थ श्रेणी चुनी है। तस्वीर में ज्ञात रोगों जैसा स्पष्ट पैटर्न नहीं दिखा, लेकिन शुरुआती लक्षण छूट सकते हैं।",
      "causes": "स्वस्थ श्रेणी पूरे पौधे या खेत के रोगमुक्त होने का प्रमाण नहीं है।",
      "treatment": "कई पौधों की जाँच जारी रखें। नई पत्तियों के नीचे देखें, सूखे अवशेष हटाएँ और बिना कारण दवा न छिड़कें। लक्षण दिखें तो कृषि विशेषज्ञ से जाँच कराएँ।",
      "prevention": "स्वस्थ बीज-पौध लें, संतुलित सिंचाई-पोषण रखें, उचित दूरी दें, खरपतवार नियंत्रित करें और नियमित निरीक्षण करें।",
      "inspect": "नए धब्बे, पीलापन, मुड़ना, मुरझाना या असामान्य बढ़वार देखें। पोषण, धूप और पानी का तनाव भी ऐसे लक्षण दे सकता है।"
    },
    "mr": {
      "title": "ढोबळी मिरचीचे पान निरोगी दिसते",
      "symptoms": "मॉडेलने निरोगी वर्ग निवडला आहे. प्रतिमेत परिचित रोगांचे ठळक लक्षण दिसत नाही; मात्र सुरुवातीची लक्षणे सुटू शकतात.",
      "causes": "निरोगी हा वर्ग संपूर्ण झाड किंवा शेत रोगमुक्त असल्याची खात्री नाही.",
      "treatment": "अनेक झाडांची पाहणी करा. नवीन पानांच्या खालच्या बाजू तपासा, वाळलेले अवशेष काढा आणि विनाकारण फवारणी करू नका. लक्षणे दिसल्यास तज्ज्ञांचा सल्ला घ्या.",
      "prevention": "निरोगी बियाणे-रोपे वापरा, संतुलित पाणी व अन्नद्रव्ये द्या, योग्य अंतर ठेवा, तण नियंत्रण करा आणि नियमित निरीक्षण करा.",
      "inspect": "नवीन ठिपके, पिवळेपणा, पाने वाकणे, कोमेजणे किंवा असामान्य वाढ तपासा. पाणी, पोषण व उन्हाचा ताणही अशी लक्षणे देऊ शकतो."
    }
  },
  "Potato___Early_blight": {
    "en": {
      "title": "Potato early blight",
      "symptoms": "Older lower leaves develop dry brown spots with concentric “target” rings, often surrounded by yellow tissue. Spots can enlarge and merge, causing leaf death.",
      "causes": "Usually caused by Alternaria solani fungus. Warm weather, prolonged leaf wetness, ageing or stressed foliage and infected crop debris favour disease.",
      "treatment": "Remove badly affected lower leaves in dry weather and clear fallen debris. Keep foliage dry where possible, maintain plant vigour and rotate crops. Ask local extension staff about registered fungicides if disease pressure is high.",
      "prevention": "Rotate away from potatoes and tomatoes, remove volunteer plants, use healthy seed tubers, maintain balanced nutrition and avoid late-day overhead irrigation.",
      "inspect": "Inspect older lower leaves for concentric rings. Late blight, nutrient disorders and other leaf spots can resemble it."
    },
    "hi": {
      "title": "आलू का अगेती झुलसा",
      "symptoms": "अक्सर पुरानी निचली पत्तियों पर भूरे सूखे गोल धब्बे बनते हैं जिनमें एक के भीतर एक छल्ले दिखते हैं। आसपास पीलापन हो सकता है और धब्बे मिलकर पत्तियाँ सुखा सकते हैं।",
      "causes": "मुख्य कारण Alternaria solani नामक फफूंद है। गर्म मौसम, पत्तियों का देर तक गीला रहना, कमजोर या पुरानी पत्तियाँ और संक्रमित अवशेष रोग बढ़ाते हैं।",
      "treatment": "बहुत प्रभावित निचली पत्तियाँ सूखे मौसम में हटाएँ और गिरे अवशेष साफ करें। पत्तियों को देर तक गीला न रहने दें, पौधों की वृद्धि संतुलित रखें और फसल चक्र अपनाएँ। दवा के लिए स्थानीय कृषि अधिकारी से सलाह लें।",
      "prevention": "आलू/टमाटर से अलग फसल चक्र रखें, स्वयं उगे पौधे हटाएँ, स्वस्थ बीज-कंद लगाएँ, संतुलित खाद दें और देर शाम ऊपर से सिंचाई न करें।",
      "inspect": "पुरानी निचली पत्तियों पर छल्लेदार धब्बे देखें। पछेती झुलसा, पोषण की कमी और अन्य पत्ती धब्बे भी मिलते-जुलते हो सकते हैं।"
    },
    "mr": {
      "title": "बटाट्याचा अर्ली ब्लाइट",
      "symptoms": "जुन्या खालच्या पानांवर तपकिरी कोरडे गोल ठिपके व त्यात एकमेकांच्या आत वर्तुळे दिसतात. भोवती पिवळेपणा येऊ शकतो आणि ठिपके एकत्र येऊन पाने सुकतात.",
      "causes": "Alternaria solani या बुरशीमुळे रोग होतो. उबदार हवामान, पाने दीर्घकाळ ओली राहणे, कमकुवत किंवा जुनी पाने आणि संक्रमित अवशेष रोग वाढवतात.",
      "treatment": "कोरड्या हवेत बाधित खालची पाने काढा व पडलेले अवशेष नष्ट करा. पाने जास्त वेळ ओली राहू देऊ नका, जोमदार वाढ राखा आणि पीक फेरपालट करा. औषधासाठी स्थानिक कृषी सल्ला घ्या.",
      "prevention": "बटाटा/टोमॅटोऐवजी पीक फेरपालट करा, स्वयंउगवलेली झाडे काढा, निरोगी बियाणे-कंद वापरा, संतुलित खत द्या आणि संध्याकाळी वरून पाणी देणे टाळा.",
      "inspect": "जुन्या खालच्या पानांवरील वर्तुळाकार ठिपके तपासा. लेट ब्लाइट, अन्नद्रव्यांची कमतरता व इतर ठिपक्यांशी गोंधळ होऊ शकतो."
    }
  },
  "Potato___Late_blight": {
    "en": {
      "title": "Potato late blight",
      "symptoms": "Water-soaked pale-green lesions can rapidly turn brown and expand. In humid weather, white growth may appear under leaf margins; stems and tubers can also be affected.",
      "causes": "Caused by Phytophthora infestans, an oomycete. It spreads quickly in cool, wet conditions through airborne spores, infected seed tubers and volunteer potatoes.",
      "treatment": "Treat suspected late blight as urgent: contact an agricultural officer promptly, avoid moving through wet crops and safely isolate or remove infected material. Use only locally registered products exactly as labelled if advised.",
      "prevention": "Plant certified seed potatoes, remove volunteer potatoes and cull piles, monitor local disease alerts, maintain airflow and avoid overhead irrigation where possible.",
      "inspect": "Check leaf undersides, margins, stems and tubers. Frost injury and other rots can look similar; seek prompt confirmation."
    },
    "hi": {
      "title": "आलू का पछेती झुलसा",
      "symptoms": "पत्तियों पर पानी से भीगे हल्के हरे धब्बे तेजी से भूरे और बड़े हो सकते हैं। नम मौसम में पत्ती के किनारे के नीचे सफेद वृद्धि दिख सकती है। तना और कंद भी प्रभावित हो सकते हैं।",
      "causes": "यह Phytophthora infestans नामक रोगकारक से होता है। ठंडे और नम मौसम में हवा से फैलने वाले बीजाणु, संक्रमित बीज-कंद और खेत में बचे आलू के पौधे रोग फैलाते हैं।",
      "treatment": "संदेह होने पर तुरंत स्थानीय कृषि अधिकारी से संपर्क करें। गीली फसल में न चलें, संक्रमित सामग्री अलग करें और सुरक्षित तरीके से हटाएँ। दवा केवल स्थानीय पंजीकरण और लेबल के अनुसार उपयोग करें।",
      "prevention": "प्रमाणित बीज-कंद लगाएँ, स्वयं उगे आलू और खराब कंदों के ढेर हटाएँ, रोग चेतावनी देखें, हवा का आवागमन रखें और ऊपर से सिंचाई से बचें।",
      "inspect": "पत्ती के नीचे सफेद वृद्धि, तने और कंद जाँचें। पाला और अन्य सड़न से भ्रम हो सकता है; शीघ्र विशेषज्ञ पुष्टि जरूरी है।"
    },
    "mr": {
      "title": "बटाट्याचा लेट ब्लाइट",
      "symptoms": "पानांवर पाणचट फिकट हिरवे ठिपके वेगाने तपकिरी व मोठे होतात. दमट हवेत पानांच्या कडांखाली पांढरी वाढ दिसू शकते. खोड व कंदही बाधित होऊ शकतात.",
      "causes": "Phytophthora infestans या बुरशीसदृश रोगकारकामुळे होतो. थंड व दमट हवेत हवेतून पसरणारे बीजाणू, संक्रमित बियाणे-कंद व स्वयंउगवलेली झाडे रोग पसरवतात.",
      "treatment": "संशय आल्यास त्वरित कृषी अधिकाऱ्यांशी संपर्क करा. ओली पिके हाताळू नका, बाधित सामग्री वेगळी करून सुरक्षितपणे काढा. औषध फक्त स्थानिक नोंदणी व लेबलानुसार वापरा.",
      "prevention": "प्रमाणित बियाणे-कंद वापरा, स्वयंउगवलेली झाडे व खराब कंदांचे ढीग नष्ट करा, रोग इशारे पाहा, हवा खेळती ठेवा आणि वरून पाणी देणे टाळा.",
      "inspect": "पानांच्या खालच्या बाजूची पांढरी वाढ, खोड आणि कंद तपासा. थंडीची इजा व इतर कुज यांच्याशी गोंधळ होऊ शकतो."
    }
  },
  "Potato___healthy": {
    "en": {
      "title": "Potato leaf appears healthy",
      "symptoms": "The model selected the healthy potato class. This image shows no strong pattern from the model’s known disease labels, but early or hidden problems may be missed.",
      "causes": "Healthy is a classifier category, not proof that roots, tubers or the whole field are disease-free. A single leaf cannot reveal every plant-health problem.",
      "treatment": "Continue checking several plants and inspect stems and tubers when appropriate. Maintain even soil moisture and avoid unnecessary pesticide use. Seek advice if symptoms develop.",
      "prevention": "Use certified seed tubers, rotate crops, manage volunteer plants and weeds, maintain drainage and balanced nutrition, and monitor foliage through the season.",
      "inspect": "Watch for new spots, yellowing, wilting and stem lesions. Drought, nutrient imbalance and herbicide injury can resemble disease."
    },
    "hi": {
      "title": "आलू का पत्ता स्वस्थ दिखाई देता है",
      "symptoms": "मॉडल ने स्वस्थ आलू की श्रेणी चुनी है। तस्वीर में मॉडल की ज्ञात रोग श्रेणियों जैसा स्पष्ट पैटर्न नहीं दिखा, लेकिन शुरुआती या छिपी समस्या छूट सकती है।",
      "causes": "स्वस्थ श्रेणी पूरे खेत, जड़ों या कंदों के स्वस्थ होने का प्रमाणपत्र नहीं है। एक पत्ती से पौधे की सभी समस्याएँ नहीं दिखतीं।",
      "treatment": "कई पौधों की जाँच करें और जरूरत पर तने व कंद देखें। मिट्टी में समान नमी रखें और बिना जरूरत दवा न डालें। नए लक्षण दिखें तो विशेषज्ञ से सलाह लें।",
      "prevention": "प्रमाणित बीज-कंद, फसल चक्र, जल निकास, संतुलित पोषण और खरपतवार नियंत्रण अपनाएँ। पूरे मौसम पत्तियों की निगरानी करें।",
      "inspect": "धब्बे, पीलापन, मुरझाना और तने के घाव देखें। सूखा, पोषण असंतुलन और खरपतवारनाशक की चोट भी ऐसे लक्षण दे सकती है।"
    },
    "mr": {
      "title": "बटाट्याचे पान निरोगी दिसते",
      "symptoms": "मॉडेलने निरोगी बटाट्याचा वर्ग निवडला आहे. प्रतिमेत परिचित रोगांचा ठळक नमुना दिसत नाही; तरी सुरुवातीची किंवा लपलेली समस्या सुटू शकते.",
      "causes": "निरोगी हा वर्ग संपूर्ण शेत, मुळे किंवा कंद निरोगी असल्याचा दाखला नाही. एका पानावरून सर्व समस्या दिसत नाहीत.",
      "treatment": "अनेक झाडांची पाहणी करा आणि गरजेनुसार खोड व कंद तपासा. जमिनीत समतोल ओलावा ठेवा व विनाकारण फवारणी करू नका. नवीन लक्षणे दिसल्यास तज्ज्ञांचा सल्ला घ्या.",
      "prevention": "प्रमाणित बियाणे-कंद, पीक फेरपालट, योग्य निचरा, संतुलित पोषण आणि तण नियंत्रण ठेवा. संपूर्ण हंगाम निरीक्षण करा.",
      "inspect": "ठिपके, पिवळेपणा, कोमेजणे व खोडावरील जखमा पाहा. दुष्काळ, अन्नद्रव्यांचा असमतोल व तणनाशकाची इजा अशी दिसू शकते."
    }
  },
  "Tomato_Bacterial_spot": {
    "en": {
      "title": "Tomato bacterial spot",
      "symptoms": "Leaves develop small dark, water-soaked spots that turn brown or black; yellow halos may occur. Fruit can develop raised, rough or scabby lesions and severe leaf infection can cause defoliation.",
      "causes": "Caused by Xanthomonas bacteria. It can arrive on contaminated seed or transplants and spread through splashing water, wet-plant handling, tools and humid weather.",
      "treatment": "Remove affected leaves when plants are dry and clear infected debris. Avoid overhead irrigation and handling wet plants. Use clean seed and transplants. Ask local extension staff about registered bactericides; copper may be unreliable where resistance occurs.",
      "prevention": "Use certified seed, rotate away from tomato and pepper hosts, sanitize stakes and tools, maintain spacing and airflow, and control volunteer plants.",
      "inspect": "Inspect leaves and fruit for raised lesions. Early blight, Septoria, bacterial speck and spray injury can look similar."
    },
    "hi": {
      "title": "टमाटर का जीवाणु धब्बा",
      "symptoms": "पत्तियों पर छोटे गहरे, पानी से भीगे धब्बे बनकर भूरे या काले हो सकते हैं; कभी पीला घेरा दिखता है। फल पर उभरे खुरदरे धब्बे बन सकते हैं और गंभीर रोग में पत्तियाँ झड़ती हैं।",
      "causes": "यह Xanthomonas जीवाणु समूह से होता है। संक्रमित बीज/पौध से आ सकता है और पानी के छींटों, गीले पौधों, औजारों तथा नम मौसम में फैलता है।",
      "treatment": "सूखे पौधों से प्रभावित पत्तियाँ हटाएँ और अवशेष साफ करें। ऊपर से सिंचाई और गीले पौधों को छूने से बचें। साफ बीज-पौध लें। जीवाणुनाशक के लिए स्थानीय सलाह लें; प्रतिरोध होने पर कॉपर असरदार न भी हो।",
      "prevention": "रोगमुक्त बीज-पौध, फसल चक्र, साफ औजार, उचित दूरी और तण/स्वयं उगे टमाटर का नियंत्रण रखें।",
      "inspect": "पत्तियों और फलों पर उभरे धब्बे देखें। अगेती झुलसा, Septoria और स्प्रे से चोट भी मिलती-जुलती हो सकती है।"
    },
    "mr": {
      "title": "टोमॅटोवरील जिवाणूजन्य ठिपके",
      "symptoms": "पानांवर लहान काळे, पाणचट ठिपके तपकिरी किंवा काळे होतात; भोवती पिवळे वलय दिसू शकते. फळांवर उंच खरबरीत ठिपके येतात व तीव्र प्रादुर्भावात पाने गळतात.",
      "causes": "Xanthomonas जिवाणूंमुळे होतो. संक्रमित बियाणे/रोपे, पाण्याचे तुषार, ओली झाडे, अवजारे व दमट हवेमुळे प्रसार होतो.",
      "treatment": "कोरड्या झाडांवरील बाधित पाने काढा व अवशेष स्वच्छ करा. वरून पाणी देणे व ओली झाडे हाताळणे टाळा. स्वच्छ बियाणे-रोपे वापरा. जिवाणूनाशकासाठी स्थानिक सल्ला घ्या; प्रतिकार असल्यास कॉपर कमी परिणामकारक ठरू शकतो.",
      "prevention": "रोगमुक्त बियाणे-रोपे, पीक फेरपालट, स्वच्छ अवजारे, योग्य अंतर आणि स्वयंउगवलेली टोमॅटो झाडे नियंत्रणात ठेवा.",
      "inspect": "पाने व फळांवरील उंच ठिपके तपासा. अर्ली ब्लाइट, Septoria व फवारणीची इजा यांच्याशी गोंधळ होऊ शकतो."
    }
  },
  "Tomato_Early_blight": {
    "en": {
      "title": "Tomato early blight",
      "symptoms": "Older leaves commonly develop brown circular spots with concentric rings, often surrounded by yellow tissue. Lesions enlarge and merge, causing lower leaves to yellow and die; stems and fruit near the stem end may also be affected.",
      "causes": "Caused mainly by Alternaria solani. Warm weather, repeated leaf wetness, stressed plants and infected tomato or potato debris increase disease development.",
      "treatment": "Prune badly affected lower leaves in dry weather, remove fallen debris and keep foliage as dry as practical. Mulch can reduce soil splash. Maintain plant vigour. If needed, use only locally registered fungicides according to label and rotate modes of action.",
      "prevention": "Rotate crops, stake or space plants for airflow, water at soil level, mulch, remove volunteer tomatoes and potatoes, and avoid excessive or deficient nutrition.",
      "inspect": "Look for target-like rings on older leaves. Septoria and bacterial spot can also cause lesions; compare shape and seek confirmation before spraying."
    },
    "hi": {
      "title": "टमाटर का अगेती झुलसा",
      "symptoms": "पुरानी निचली पत्तियों पर भूरे गोल धब्बे और उनमें स्पष्ट गोल छल्ले बनते हैं। आसपास पीला भाग दिख सकता है। धब्बे बढ़कर मिलते हैं, जिससे निचली पत्तियाँ पीली होकर सूखती हैं।",
      "causes": "मुख्य कारण Alternaria solani फफूंद है। गर्म मौसम, पत्तियों का देर तक गीला रहना, कमजोर पौधे और संक्रमित टमाटर/आलू अवशेष रोग बढ़ाते हैं।",
      "treatment": "सूखे मौसम में प्रभावित निचली पत्तियाँ हटाएँ, गिरे अवशेष साफ करें और पत्तियों को सूखा रखने की कोशिश करें। मल्च मिट्टी के छींटे कम कर सकता है। जरूरत पर स्थानीय पंजीकृत फफूंदनाशक लेबल अनुसार उपयोग करें।",
      "prevention": "फसल चक्र, पौधों में हवा के लिए दूरी, सहारा, मिट्टी के पास सिंचाई, मल्च और स्वयं उगे टमाटर/आलू का नियंत्रण रखें।",
      "inspect": "पुरानी पत्तियों पर लक्ष्य जैसे छल्ले देखें। Septoria और जीवाणु धब्बे भी हो सकते हैं; दवा से पहले पहचान जरूरी है।"
    },
    "mr": {
      "title": "टोमॅटोचा अर्ली ब्लाइट",
      "symptoms": "जुन्या खालच्या पानांवर तपकिरी गोल ठिपके व त्यात स्पष्ट वर्तुळे दिसतात. भोवती पिवळेपणा असू शकतो. ठिपके वाढून एकत्र येतात; पाने पिवळी होऊन सुकतात.",
      "causes": "Alternaria solani बुरशी हे मुख्य कारण आहे. उबदार हवामान, पाने जास्त वेळ ओली राहणे, कमकुवत झाडे आणि संक्रमित टोमॅटो/बटाटा अवशेष रोग वाढवतात.",
      "treatment": "कोरड्या हवेत बाधित खालची पाने काढा, अवशेष स्वच्छ करा आणि पाने कोरडी ठेवा. मल्चमुळे मातीचे तुषार कमी होतात. गरज असल्यास स्थानिक नोंदणीकृत बुरशीनाशक लेबलानुसार वापरा.",
      "prevention": "पीक फेरपालट, झाडांना आधार व योग्य अंतर, मुळाशी पाणी, मल्च आणि स्वयंउगवलेली टोमॅटो/बटाटा झाडे काढा.",
      "inspect": "जुन्या पानांवरील लक्ष्याकार वर्तुळे पाहा. Septoria व जिवाणूजन्य ठिपकेही दिसू शकतात; फवारणीपूर्वी योग्य ओळख आवश्यक आहे."
    }
  },
  "Tomato_Late_blight": {
    "en": {
      "title": "Tomato late blight",
      "symptoms": "Large irregular water-soaked grey-green lesions can turn brown and expand quickly. In humid weather, white growth may appear at lesion edges on leaf undersides. Stems and fruit may also develop dark or brown lesions.",
      "causes": "Caused by Phytophthora infestans. It spreads rapidly in cool, wet conditions through airborne spores and infected plant material, including volunteer potatoes and tomatoes.",
      "treatment": "Act quickly if suspected: avoid handling wet plants, contain infected material and seek local agricultural advice promptly. Do not rely on an image prediction alone. Use only locally registered products exactly as labelled if advised.",
      "prevention": "Monitor local disease alerts, use healthy transplants, remove volunteer potatoes and tomatoes, maintain airflow, avoid overhead watering and dispose of infected residues appropriately.",
      "inspect": "Inspect leaf undersides, stems and fruit. Frost, other rots and early blight can be confused with it; prompt expert confirmation is important."
    },
    "hi": {
      "title": "टमाटर का पछेती झुलसा",
      "symptoms": "बड़े अनियमित पानी से भीगे हरे-धूसर धब्बे तेजी से भूरे हो सकते हैं। नम मौसम में पत्ती के नीचे धब्बे के किनारे सफेद वृद्धि दिख सकती है। तने और फलों पर भी गहरे या भूरे घाव बन सकते हैं।",
      "causes": "यह Phytophthora infestans से होता है। ठंडे-नम मौसम में हवा से फैलता है और संक्रमित पौध सामग्री या स्वयं उगे आलू/टमाटर से बना रह सकता है।",
      "treatment": "संदेह होने पर तुरंत कृषि अधिकारी से पुष्टि कराएँ। गीले पौधों को न छुएँ, संक्रमित सामग्री अलग करके सुरक्षित हटाएँ। केवल स्थानीय रूप से पंजीकृत उत्पाद विशेषज्ञ की सलाह से उपयोग करें।",
      "prevention": "रोग चेतावनी देखें, स्वस्थ पौध लगाएँ, स्वयं उगे आलू/टमाटर हटाएँ, हवा रखें और ऊपर से सिंचाई न करें। संक्रमित अवशेष उचित तरीके से हटाएँ।",
      "inspect": "पत्तियों के नीचे, तने और फलों की जाँच करें। पाला, अन्य सड़न और अगेती झुलसा से भ्रम हो सकता है।"
    },
    "mr": {
      "title": "टोमॅटोचा लेट ब्लाइट",
      "symptoms": "मोठे अनियमित पाणचट हिरवट-करडे ठिपके वेगाने तपकिरी होतात. दमट हवेत पानाखाली ठिपक्यांच्या कडांवर पांढरी वाढ दिसू शकते. खोड व फळांवरही गडद किंवा तपकिरी घाव येतात.",
      "causes": "Phytophthora infestans मुळे होतो. थंड व दमट हवेत हवेतून पसरतो आणि संक्रमित झाडे किंवा स्वयंउगवलेल्या बटाटा/टोमॅटोमुळे टिकतो.",
      "treatment": "संशय असल्यास त्वरित कृषी अधिकाऱ्यांकडून खात्री करा. ओली झाडे हाताळू नका; बाधित सामग्री वेगळी करून सुरक्षितपणे काढा. फक्त स्थानिक नोंदणीकृत औषध तज्ज्ञांच्या सल्ल्याने वापरा.",
      "prevention": "रोग इशारे पाहा, निरोगी रोपे लावा, स्वयंउगवलेली बटाटा/टोमॅटो झाडे काढा, हवा खेळती ठेवा व वरून पाणी देणे टाळा.",
      "inspect": "पानाखाली, खोड व फळे तपासा. थंडीची इजा, इतर कुज व अर्ली ब्लाइट यांच्याशी गोंधळ होऊ शकतो."
    }
  },
  "Tomato_Leaf_Mold": {
    "en": {
      "title": "Tomato leaf mold",
      "symptoms": "Pale yellow-green patches appear on upper leaf surfaces. Olive-green to grey-purple velvety growth may form underneath in humid conditions; leaves can curl, wither and drop.",
      "causes": "Caused by Passalora fulva fungus. High humidity, poor ventilation and prolonged leaf wetness favour infection, especially in protected cultivation.",
      "treatment": "Remove affected leaves carefully. Improve ventilation, reduce humidity and avoid wetting foliage. Clean greenhouse surfaces and tools. Seek local guidance on resistant varieties and registered fungicides for severe outbreaks.",
      "prevention": "Use resistant varieties where available, space and prune plants for airflow, ventilate greenhouses, water at soil level and remove crop debris after harvest.",
      "inspect": "Check undersides of yellowed leaves for velvety olive-grey growth. Nutrient deficiencies can cause yellow patches but not this characteristic growth."
    },
    "hi": {
      "title": "टमाटर का पत्ती मोल्ड रोग",
      "symptoms": "पत्ती की ऊपरी सतह पर हल्के पीले-हरे धब्बे दिखते हैं। अधिक नमी में नीचे जैतूनी हरी या धूसर-बैंगनी मखमली वृद्धि बन सकती है। गंभीर स्थिति में पत्तियाँ मुड़कर सूखती और झड़ती हैं।",
      "causes": "यह Passalora fulva नामक फफूंद से होता है। अधिक आर्द्रता, कम हवा का आवागमन और पत्तियों का लंबे समय तक गीला रहना, खासकर पॉलीहाउस में, रोग बढ़ाते हैं।",
      "treatment": "प्रभावित पत्तियाँ सावधानी से हटाएँ। वेंटिलेशन बढ़ाएँ, नमी घटाएँ और पत्तियों पर पानी न डालें। पॉलीहाउस और औजार साफ रखें। गंभीर स्थिति में स्थानीय सलाह लें।",
      "prevention": "उपलब्ध हो तो प्रतिरोधी किस्म लें, उचित दूरी और छँटाई रखें, पॉलीहाउस हवादार रखें, जड़ के पास पानी दें और फसल बाद अवशेष हटाएँ।",
      "inspect": "पीली पत्तियों के नीचे मखमली जैतूनी-धूसर वृद्धि देखें। पोषण की कमी में पीले धब्बे हो सकते हैं, पर यह वृद्धि नहीं होती।"
    },
    "mr": {
      "title": "टोमॅटोवरील पानांचा मोल्ड रोग",
      "symptoms": "पानांच्या वरच्या बाजूला फिकट पिवळे-हिरवे डाग दिसतात. दमट हवेत खाली ऑलिव्ह हिरवी किंवा करडी-जांभळी मखमली वाढ दिसू शकते. पाने वाकतात, सुकतात व गळतात.",
      "causes": "Passalora fulva या बुरशीमुळे होतो. जास्त आर्द्रता, कमी हवा खेळती राहणे आणि पाने दीर्घकाळ ओली राहणे, विशेषतः पॉलीहाऊसमध्ये, रोग वाढवते.",
      "treatment": "बाधित पाने काळजीपूर्वक काढा. हवा खेळती ठेवा, आर्द्रता कमी करा व पानांवर पाणी देऊ नका. पॉलीहाऊस व अवजारे स्वच्छ ठेवा. गंभीर प्रादुर्भावात स्थानिक सल्ला घ्या.",
      "prevention": "उपलब्ध असल्यास प्रतिरोधक वाण वापरा, योग्य अंतर व छाटणी करा, पॉलीहाऊस हवेशीर ठेवा, मुळाशी पाणी द्या आणि अवशेष काढा.",
      "inspect": "पिवळ्या पानांच्या खाली मखमली ऑलिव्ह-करडी वाढ तपासा. अन्नद्रव्य कमतरतेत पिवळे डाग येतात पण अशी वाढ नसते."
    }
  },
  "Tomato_Septoria_leaf_spot": {
    "en": {
      "title": "Tomato Septoria leaf spot",
      "symptoms": "Many small round spots develop mainly on lower leaves. They often have pale or grey centres, dark margins and tiny black dots in the centre. Leaves yellow and drop as infection progresses.",
      "causes": "Caused by Septoria lycopersici fungus. Spores spread by splashing rain or irrigation from infected debris, volunteer tomatoes and nearby plants; wet foliage favours infection.",
      "treatment": "Remove infected lower leaves when dry and collect fallen debris. Avoid overhead watering, mulch to reduce soil splash and do not work among wet plants. Seek local advice if fungicide protection is needed.",
      "prevention": "Rotate away from tomatoes, remove volunteer plants and nightshade weeds, stake plants, maintain spacing, mulch and water at soil level.",
      "inspect": "Look for small spots with grey centres and dark borders. Bacterial spot and early blight can resemble it; early blight usually has larger target-like rings."
    },
    "hi": {
      "title": "टमाटर का Septoria पत्ती धब्बा",
      "symptoms": "अक्सर निचली पत्तियों पर कई छोटे गोल धब्बे बनते हैं। बीच का भाग धूसर या हल्का और किनारा गहरा हो सकता है; बीच में छोटे काले बिंदु दिख सकते हैं। रोग बढ़ने पर पत्तियाँ पीली होकर झड़ती हैं।",
      "causes": "यह Septoria lycopersici फफूंद से होता है। बारिश/सिंचाई के छींटे, संक्रमित अवशेष, स्वयं उगे टमाटर और गीली पत्तियाँ रोग फैलाते हैं।",
      "treatment": "सूखे मौसम में संक्रमित निचली पत्तियाँ हटाएँ और गिरे अवशेष इकट्ठा करें। ऊपर से सिंचाई न करें, मल्च डालें और गीले पौधों में काम न करें। जरूरत पर स्थानीय कृषि सलाह लें।",
      "prevention": "टमाटर से अलग फसल चक्र, स्वयं उगे पौधों/खरपतवार नियंत्रण, सहारा, उचित दूरी, मल्च और जड़ के पास सिंचाई अपनाएँ।",
      "inspect": "धूसर बीच और गहरे किनारे वाले छोटे धब्बे देखें। Bacterial spot और अगेती झुलसा से भ्रम हो सकता है।"
    },
    "mr": {
      "title": "टोमॅटोवरील Septoria पानांचे ठिपके",
      "symptoms": "बहुतेक खालच्या पानांवर अनेक लहान गोल ठिपके दिसतात. मध्यभाग करडा/फिकट व कडा गडद असतात; मध्यभागी छोटे काळे बिंदू असू शकतात. रोग वाढल्यास पाने पिवळी होऊन गळतात.",
      "causes": "Septoria lycopersici बुरशीमुळे होतो. पावसाचे/सिंचनाचे तुषार, संक्रमित अवशेष, स्वयंउगवलेली टोमॅटो झाडे आणि ओली पाने यामुळे प्रसार होतो.",
      "treatment": "कोरड्या हवेत बाधित खालची पाने काढा व अवशेष गोळा करा. वरून पाणी देऊ नका, मल्च वापरा आणि ओली झाडे हाताळू नका. गरज असल्यास स्थानिक कृषी सल्ला घ्या.",
      "prevention": "टोमॅटोऐवजी पीक फेरपालट, स्वयंउगवलेली झाडे व तण नियंत्रण, आधार, योग्य अंतर, मल्च आणि मुळाशी पाणी द्या.",
      "inspect": "करडा मध्यभाग व गडद कडा असलेले लहान ठिपके पाहा. जिवाणूजन्य ठिपके व अर्ली ब्लाइटसारखे दिसू शकतात."
    }
  },
  "Tomato_Spider_mites_Two_spotted_spider_mite": {
    "en": {
      "title": "Tomato two-spotted spider mite",
      "symptoms": "Feeding causes fine pale stippling or tiny yellow-white dots. Heavy infestations can bronze and dry leaves and produce fine webbing; mites and eggs are usually on leaf undersides.",
      "causes": "Caused by Tetranychus urticae mites, not a fungus or bacterium. Hot, dry and dusty conditions favour outbreaks; broad-spectrum insecticides can kill natural enemies and worsen them.",
      "treatment": "Confirm mites with a hand lens before acting. Remove heavily infested leaves where practical, reduce dust and avoid water stress. Preserve beneficial predators and seek local advice before using a miticide.",
      "prevention": "Scout regularly, manage weeds and dust, maintain adequate irrigation, avoid unnecessary broad-spectrum insecticides and conserve natural predators.",
      "inspect": "Distinguish stippling and webbing from fungal spots, nutrient stress and spray injury. Tap leaves over white paper and look for moving specks."
    },
    "hi": {
      "title": "टमाटर पर दो-धब्बेदार स्पाइडर माइट",
      "symptoms": "पत्तियों पर बहुत छोटे पीले-सफेद बिंदु दिखते हैं। अधिक प्रकोप में पत्तियाँ कांस्य रंग की और सूखी हो सकती हैं तथा महीन जाले बनते हैं। माइट और अंडे अक्सर पत्ती के नीचे मिलते हैं।",
      "causes": "यह Tetranychus urticae नामक माइट से होता है, फफूंद या जीवाणु से नहीं। गर्म, सूखा और धूलभरा मौसम इसे बढ़ाता है; कुछ व्यापक कीटनाशक प्राकृतिक शत्रुओं को मारकर प्रकोप बढ़ा सकते हैं।",
      "treatment": "पहले आवर्धक शीशे से माइट की पुष्टि करें। बहुत प्रभावित पत्तियाँ हटाएँ, धूल घटाएँ और पानी की कमी न होने दें। लाभकारी जीवों को बचाएँ; माइटनाशक से पहले स्थानीय सलाह लें।",
      "prevention": "नियमित निरीक्षण, धूल/खरपतवार नियंत्रण, संतुलित सिंचाई और अनावश्यक व्यापक कीटनाशक से बचाव करें। प्राकृतिक शत्रुओं का संरक्षण करें।",
      "inspect": "जाले और बारीक बिंदुओं को फफूंद धब्बों, पोषण तनाव और स्प्रे चोट से अलग पहचानें। पत्ती को सफेद कागज पर थपथपाकर चलते छोटे बिंदु देखें।"
    },
    "mr": {
      "title": "टोमॅटोवरील दोन ठिपक्यांचा स्पायडर माइट",
      "symptoms": "पानांवर अतिशय लहान पिवळे-पांढरे ठिपके दिसतात. जास्त प्रादुर्भावात पाने कांस्य रंगाची व कोरडी होतात आणि बारीक जाळे दिसते. माइट व अंडी पानांच्या खाली असतात.",
      "causes": "Tetranychus urticae या माइटमुळे रस शोषला जातो; हा बुरशी किंवा जिवाणू रोग नाही. गरम, कोरडे व धुळीचे वातावरण वाढीस पोषक असते. काही कीटकनाशके नैसर्गिक शत्रू नष्ट करून प्रादुर्भाव वाढवतात.",
      "treatment": "आधी भिंगाने माइटची खात्री करा. बाधित पाने काढा, धूळ कमी करा आणि पाण्याचा ताण टाळा. उपयुक्त भक्षक कीटक जपा; माइटनाशकापूर्वी स्थानिक सल्ला घ्या.",
      "prevention": "नियमित पाहणी, धूळ/तण नियंत्रण, योग्य सिंचन आणि विनाकारण व्यापक कीटकनाशक टाळा. नैसर्गिक शत्रूंचे संरक्षण करा.",
      "inspect": "बारीक जाळे व ठिपके बुरशीचे डाग, पोषण ताण किंवा फवारणीच्या इजेपासून वेगळे ओळखा. पान पांढऱ्या कागदावर हलवून छोटे कण पाहा."
    }
  },
  "Tomato__Target_Spot": {
    "en": {
      "title": "Tomato target spot",
      "symptoms": "Brown circular or irregular lesions may show concentric rings and a yellow halo. Spots can occur on leaves, stems and fruit; severe infection can cause early leaf drop.",
      "causes": "Caused by Corynespora cassiicola fungus. Warm humid weather, extended leaf wetness and infected crop residues favour disease.",
      "treatment": "Remove badly affected leaves and crop debris. Improve airflow and avoid overhead irrigation. For significant outbreaks, consult local extension recommendations for registered fungicides and resistance rotation.",
      "prevention": "Use healthy transplants, rotate crops where practical, maintain spacing and airflow, control weeds and volunteers, and avoid working in wet foliage.",
      "inspect": "Target spot can resemble early blight and other leaf spots. Compare lesion size, ring pattern and symptoms on stems or fruit."
    },
    "hi": {
      "title": "टमाटर का Target Spot",
      "symptoms": "पत्तियों पर भूरे गोल या अनियमित धब्बे बन सकते हैं जिनमें छल्ले और कभी पीला घेरा दिखता है। तने और फल भी प्रभावित हो सकते हैं; गंभीर रोग में पत्तियाँ समय से पहले झड़ती हैं।",
      "causes": "यह Corynespora cassiicola फफूंद से होता है। गर्म-नम मौसम, पत्तियों का लंबे समय तक गीला रहना और संक्रमित अवशेष रोग बढ़ाते हैं।",
      "treatment": "बहुत प्रभावित पत्तियाँ और फसल-अवशेष हटाकर नष्ट करें। हवा का आवागमन बढ़ाएँ और ऊपर से सिंचाई से बचें। अधिक प्रकोप पर स्थानीय कृषि सलाह से पंजीकृत फफूंदनाशक चुनें।",
      "prevention": "स्वस्थ पौध लें, उचित दूरी रखें, खरपतवार और स्वयं उगे पौधे हटाएँ तथा गीली पत्तियों में काम न करें।",
      "inspect": "यह अगेती झुलसा और अन्य पत्ती धब्बों जैसा दिख सकता है। धब्बे का आकार, छल्ले और तने/फल के लक्षण मिलाकर देखें।"
    },
    "mr": {
      "title": "टोमॅटोवरील Target Spot",
      "symptoms": "पानांवर तपकिरी गोल किंवा अनियमित ठिपके, वर्तुळे व कधी पिवळे वलय दिसते. खोड व फळांवरही लक्षणे येऊ शकतात; तीव्र प्रादुर्भावात पाने लवकर गळतात.",
      "causes": "Corynespora cassiicola बुरशीमुळे होतो. उबदार-दमट हवामान, पाने दीर्घकाळ ओली राहणे आणि संक्रमित अवशेष रोग वाढवतात.",
      "treatment": "बाधित पाने व अवशेष काढून नष्ट करा. हवा खेळती ठेवा व वरून पाणी देणे टाळा. जास्त प्रादुर्भावात स्थानिक कृषी सल्ल्यानुसार नोंदणीकृत बुरशीनाशक निवडा.",
      "prevention": "निरोगी रोपे वापरा, योग्य अंतर ठेवा, तण व स्वयंउगवलेली झाडे काढा आणि ओली पाने हाताळू नका.",
      "inspect": "अर्ली ब्लाइट व इतर पानांच्या ठिपक्यांसारखे दिसू शकते. ठिपक्यांचा आकार, वर्तुळे व खोड/फळांवरील लक्षणे तपासा."
    }
  },
  "Tomato__Tomato_YellowLeaf__Curl_Virus": {
    "en": {
      "title": "Tomato yellow leaf curl virus",
      "symptoms": "Young leaves may become small, yellow at the margins and curl upward. Plants can be stunted with shortened internodes and poor flowering or fruit set.",
      "causes": "Caused by Tomato yellow leaf curl virus (TYLCV), transmitted mainly by whiteflies (Bemisia tabaci). Infected transplants and host weeds can maintain the virus.",
      "treatment": "There is no curative spray for a virus-infected plant. Confirm the diagnosis, remove severely infected plants where advised, manage whiteflies with integrated pest management and protect healthy seedlings with insect-proof screening.",
      "prevention": "Use virus-free transplants, resistant varieties where available, control whitefly host weeds, use nursery screens where suitable and monitor whiteflies early.",
      "inspect": "Nutrient stress, herbicide injury and other viruses can curl leaves. Check for whiteflies, yellowing and stunting; lab confirmation may be needed."
    },
    "hi": {
      "title": "टमाटर का पीला पत्ती मोड़ विषाणु",
      "symptoms": "नई पत्तियाँ छोटी हो सकती हैं, किनारे पीले होकर ऊपर की ओर मुड़ते हैं। पौधा बौना रह सकता है, गांठों के बीच दूरी घटती है और फूल/फल कम लगते हैं।",
      "causes": "यह Tomato yellow leaf curl virus (TYLCV) से होता है और मुख्यतः सफेद मक्खी (Bemisia tabaci) से फैलता है। संक्रमित पौध और आसपास के खरपतवार वायरस बनाए रख सकते हैं।",
      "treatment": "वायरस लगे पौधे को ठीक करने वाला स्प्रे नहीं है। निदान की पुष्टि करें; स्थानीय सलाह के अनुसार गंभीर संक्रमित पौधे हटाएँ और सफेद मक्खी का समेकित प्रबंधन करें। स्वस्थ पौध को कीटरोधी जाली से बचाएँ।",
      "prevention": "वायरस-मुक्त पौध, उपलब्ध प्रतिरोधी किस्में, खरपतवार नियंत्रण, नर्सरी में जाली और शुरुआती सफेद मक्खी निगरानी अपनाएँ।",
      "inspect": "पोषण तनाव, खरपतवारनाशक चोट और दूसरे वायरस भी पत्ती मोड़ सकते हैं। सफेद मक्खी, पीलापन और बौनेपन को साथ देखें।"
    },
    "mr": {
      "title": "टोमॅटोचा पिवळा पान गुंडाळी विषाणू",
      "symptoms": "नवीन पाने लहान होतात, कडा पिवळ्या पडून वर वळतात. झाड खुंटते, पेरांमधील अंतर कमी होते आणि फुले/फळे कमी लागतात.",
      "causes": "Tomato yellow leaf curl virus (TYLCV) मुळे होतो. मुख्यतः पांढरी माशी (Bemisia tabaci) विषाणू पसरवते. संक्रमित रोपे व पोषक तणे विषाणू टिकवू शकतात.",
      "treatment": "विषाणू लागलेले झाड बरे करणारी फवारणी नाही. निदानाची खात्री करा; स्थानिक सल्ल्यानुसार तीव्र बाधित झाडे काढा व पांढऱ्या माशीचे एकात्मिक व्यवस्थापन करा. निरोगी रोपे जाळीने सुरक्षित ठेवा.",
      "prevention": "विषाणूमुक्त रोपे, उपलब्ध प्रतिरोधक वाण, तण नियंत्रण, रोपवाटिकेत जाळी आणि सुरुवातीपासून पांढऱ्या माशीची पाहणी करा.",
      "inspect": "पोषण ताण, तणनाशकाची इजा व इतर विषाणूंमुळेही पाने वळतात. पांढरी माशी, पिवळेपणा व खुंटलेली वाढ एकत्र तपासा."
    }
  },
  "Tomato__Tomato_mosaic_virus": {
    "en": {
      "title": "Tomato mosaic virus",
      "symptoms": "Leaves may show light and dark green mosaic patterns, distortion or narrow leaflets. Growth may be reduced and fruit can ripen unevenly, depending on strain and cultivar.",
      "causes": "Caused by Tomato mosaic virus (ToMV). It spreads mainly through contaminated hands, tools, clothing, plant contact and infected seed or transplants, not primarily through insect vectors.",
      "treatment": "There is no cure for an infected plant. Confirm the diagnosis, remove infected plants where advised, wash hands and disinfect tools. Avoid handling healthy plants after touching suspect material.",
      "prevention": "Use certified virus-free seed and transplants, resistant varieties where available, sanitize tools and hands, and remove crop debris.",
      "inspect": "Nutrient disorders and other viruses can produce mosaic patterns. Look for persistent mottling and distortion; use lab confirmation when needed."
    },
    "hi": {
      "title": "टमाटर का Mosaic विषाणु",
      "symptoms": "पत्तियों पर हल्के और गहरे हरे रंग का चितकबरा पैटर्न दिख सकता है। पत्तियाँ विकृत या संकरी हो सकती हैं और बढ़वार घट सकती है। कुछ किस्मों में फल असमान पकते हैं।",
      "causes": "यह Tomato mosaic virus (ToMV) से होता है। संक्रमित बीज/पौध, हाथ, औजार, कपड़े और पौधे से पौधे के संपर्क से फैलता है; यह मुख्यतः कीटों से नहीं फैलता।",
      "treatment": "संक्रमित पौधे को ठीक करने का उपचार नहीं है। पुष्टि होने पर स्थानीय सलाह से पौधा हटाएँ। हाथ और औजार साफ करें और संक्रमित सामग्री छूने के बाद स्वस्थ पौधों को न छुएँ।",
      "prevention": "प्रमाणित वायरस-मुक्त बीज/पौध लें, उपलब्ध प्रतिरोधी किस्में चुनें, औजार और हाथ साफ रखें तथा फसल-अवशेष हटाएँ।",
      "inspect": "पोषण असंतुलन और अन्य वायरस भी चितकबरा पैटर्न दे सकते हैं। लगातार मोज़ेक और पत्ती विकृति देखें; जरूरत पर प्रयोगशाला पुष्टि लें।"
    },
    "mr": {
      "title": "टोमॅटोचा Mosaic विषाणू",
      "symptoms": "पानांवर फिकट व गडद हिरव्या रंगाचे चित्तरक दिसते. पाने विकृत किंवा अरुंद होऊ शकतात आणि वाढ कमी होते. काही वाणांमध्ये फळे असमान पिकतात.",
      "causes": "Tomato mosaic virus (ToMV) मुळे होतो. संक्रमित बियाणे/रोपे, हात, अवजारे, कपडे व झाडांच्या संपर्कातून प्रसार होतो; मुख्यतः कीटकांमुळे पसरत नाही.",
      "treatment": "संक्रमित झाड बरे करण्याचा उपाय नाही. खात्री झाल्यावर स्थानिक सल्ल्याने झाड काढा. हात व अवजारे स्वच्छ करा आणि संक्रमित सामग्री हाताळल्यानंतर निरोगी झाडांना स्पर्श करू नका.",
      "prevention": "प्रमाणित विषाणूमुक्त बियाणे/रोपे वापरा, उपलब्ध प्रतिरोधक वाण निवडा, हात-अवजारे स्वच्छ ठेवा आणि पीक अवशेष काढा.",
      "inspect": "अन्नद्रव्य असमतोल व इतर विषाणूंमुळेही चित्तरक दिसू शकते. सततचे मोज़ेक व पानांची विकृती पाहा; गरज असल्यास प्रयोगशाळा तपासणी करा."
    }
  },
  "Tomato_healthy": {
    "en": {
      "title": "Tomato leaf appears healthy",
      "symptoms": "The model selected the healthy tomato class. The image does not show a strong pattern from the model’s known disease labels, but early symptoms or problems outside its 15 classes may be missed.",
      "causes": "Healthy is a classifier label, not proof that the plant, roots, fruit or entire field are free from disease, pests or nutrient stress.",
      "treatment": "Continue scouting several plants and inspect both leaf surfaces, stems and fruit. Maintain even irrigation and balanced nutrition. Do not apply pesticides solely because of a model output.",
      "prevention": "Use clean transplants, rotate crops, mulch, maintain airflow, irrigate at soil level, manage weeds and monitor plants regularly.",
      "inspect": "Watch for new spots, mosaic, yellowing, curling, wilting or webbing. Water stress, nutrient imbalance, herbicide drift and pests can resemble disease."
    },
    "hi": {
      "title": "टमाटर का पत्ता स्वस्थ दिखाई देता है",
      "symptoms": "मॉडल ने टमाटर की स्वस्थ श्रेणी चुनी है। तस्वीर में ज्ञात रोगों का स्पष्ट पैटर्न नहीं दिखा, लेकिन शुरुआती लक्षण या 15 श्रेणियों से बाहर की समस्या छूट सकती है।",
      "causes": "स्वस्थ श्रेणी पूरे पौधे, जड़ों, फलों या खेत के रोगमुक्त होने का प्रमाण नहीं है।",
      "treatment": "कई पौधों और पत्तियों के दोनों ओर निरीक्षण जारी रखें। संतुलित सिंचाई और पोषण रखें। केवल मॉडल के परिणाम के कारण कीटनाशक न डालें; नए लक्षण दिखें तो सलाह लें।",
      "prevention": "स्वस्थ पौध लें, फसल चक्र, मल्च, उचित दूरी, जड़ के पास सिंचाई, खरपतवार नियंत्रण और नियमित निगरानी अपनाएँ।",
      "inspect": "नए धब्बे, मोज़ेक, पीलापन, मुड़ना, मुरझाना या जाले देखें। पानी/पोषण तनाव, स्प्रे की चोट और कीट रोग जैसे दिख सकते हैं।"
    },
    "mr": {
      "title": "टोमॅटोचे पान निरोगी दिसते",
      "symptoms": "मॉडेलने टोमॅटोचा निरोगी वर्ग निवडला आहे. प्रतिमेत परिचित रोगांचे ठळक लक्षण दिसत नाही; मात्र सुरुवातीची लक्षणे किंवा १५ वर्गांबाहेरील समस्या सुटू शकते.",
      "causes": "निरोगी हा वर्ग संपूर्ण झाड, मुळे, फळे किंवा शेत रोगमुक्त असल्याचा पुरावा नाही.",
      "treatment": "अनेक झाडांची आणि पानांच्या दोन्ही बाजूंची पाहणी करा. संतुलित पाणी व पोषण द्या. केवळ मॉडेलच्या निकालामुळे कीटकनाशक वापरू नका; नवीन लक्षणे दिसल्यास सल्ला घ्या.",
      "prevention": "निरोगी रोपे, पीक फेरपालट, मल्च, योग्य अंतर, मुळाशी पाणी, तण नियंत्रण आणि नियमित निरीक्षण करा.",
      "inspect": "नवीन ठिपके, मोज़ेक, पिवळेपणा, पाने वाकणे, कोमेजणे किंवा जाळे तपासा. पाणी/पोषण ताण व फवारणीची इजा रोगासारखी दिसू शकते."
    }
  }
};
