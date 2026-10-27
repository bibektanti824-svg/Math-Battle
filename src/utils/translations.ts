/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Bilingual Localization (English & Hindi) for Math Battle
 */

export type LanguageCode = 'en' | 'hi';

export const TRANSLATIONS = {
  en: {
    app_name: 'Math Battle',
    tagline: 'Sharpen Your Mind, Conquer Math!',
    coins: 'Coins',
    points: 'Points',
    score: 'Score',
    rank: 'Rank',
    level: 'Level',
    next_rank: 'Next Rank',
    
    // Home Cards
    menu_play: 'Play Game',
    menu_play_desc: 'Speed calculations & arithmetic challenges',
    menu_rank: 'Rank & Rewards',
    menu_rank_desc: '30 military ranks from Bronze to Legend',
    menu_theme: 'Theme Store',
    menu_theme_desc: 'Unlock vibrant game styles & neon colors',
    menu_creator: 'About Creator',
    menu_creator_desc: 'Story of Bibek Kumar Tanti',
    menu_share: 'Share App',
    menu_share_desc: 'Invite friends to test their math speed',
    menu_support: 'Support Creator',
    
    // Modes
    select_mode: 'Select Game Mode',
    mode_1min_title: '1-Minute Challenge',
    mode_1min_desc: 'Answer as many questions as you can in 60 seconds.',
    mode_30s_title: '30-Second Speed Run',
    mode_30s_desc: 'Lightning fast round! Push your quick reflexes.',
    mode_endless_title: 'Endless Mode',
    mode_endless_desc: 'Play at your own pace without any timer pressure.',
    start_battle: 'Start Battle',
    
    // Gameplay
    time_left: 'Time Left',
    seconds_abbr: 's',
    endless_active: 'Endless Battle',
    finish_round: 'Finish Round',
    quit_confirm_title: 'Exit Match?',
    quit_confirm_desc: 'Your earned coins and points will still be recorded.',
    resume: 'Resume',
    exit: 'Exit',
    correct_alert: 'Excellent! +10 Score',
    wrong_alert: 'Oops! Keep going',
    
    // Results
    results_title: 'Battle Results',
    final_score: 'Final Score',
    correct_answers: 'Correct Answers',
    incorrect_answers: 'Incorrect Answers',
    accuracy: 'Accuracy',
    total_answered: 'Total Questions',
    round_rewards: 'Round Rewards',
    coins_earned: 'Coins Earned',
    points_earned: 'Points Earned',
    new_rank_unlocked: 'New Rank Unlocked!',
    play_again: 'Play Again',
    back_to_home: 'Home Screen',
    
    // Rank & Rewards
    rank_rewards_title: 'Ranks & Rewards',
    rank_system_desc: 'Earn +5 points per correct answer to rank up across 30 tiers.',
    current_earned_points: 'Total Earned Points',
    unlocked_status: 'Unlocked',
    locked_status: 'Locked',
    claimed_status: 'Claimed',
    claim_reward_btn: 'Claim Reward',
    already_claimed_btn: 'Reward Claimed',
    need_points: 'points needed',
    
    // Theme Store
    theme_store_title: 'Theme Store',
    theme_store_desc: 'Customize your Math Battle look. Equipped themes persist permanently.',
    theme_free: 'Free Default',
    theme_buy: 'Buy Theme',
    theme_equip: 'Equip Theme',
    theme_equipped: 'Equipped',
    not_enough_coins: 'Not enough coins! Play more battles to earn.',
    theme_bought_success: 'Theme purchased and equipped!',
    
    // About Creator
    about_creator_title: 'About the Creator',
    creator_name: 'Bibek Kumar Tanti',
    english_story_title: 'English Story',
    english_story_text:
      'My name is Bibek Kumar Tanti. I am learning programming with a passionate dream: to build engaging mobile applications and interactive games. With limited resources, using my smartphone, immense patience, and persistent curiosity, I developed Math Battle from the ground up. My goal is to make arithmetic fun and exciting for students and casual gamers alike, while continuously growing my skills as an independent Android developer. Thank you for playing and supporting my journey!',
    hindi_story_title: 'Hindi Story (हिन्दी)',
    hindi_story_text:
      'मेरा नाम विवेक कुमार तांती (Bibek Kumar Tanti) है। मैं गहरी लगन और उत्साह के साथ प्रोग्रामिंग सीख रहा हूँ। सीमित संसाधनों के बीच, अपने मोबाइल फोन, धैर्य, जिज्ञासा और निरंतर मेहनत के बल पर मैंने "मैथ बैटल" (Math Battle) का निर्माण किया है। मेरा उद्देश्य गणित के अभ्यास को हर छात्र और खिलाड़ी के लिए मनोरंजक बनाना है, और एक स्वतंत्र एंड्रॉइड डेवलपर के रूप में अपने कौशल को लगातार निखारना है। इस गेम को खेलने और मेरी इस यात्रा का हिस्सा बनने के लिए आपका हृदय से धन्यवाद!',
      
    // Support Screen
    support_title: 'Support the Creator',
    support_friendly_msg:
      'Enjoying Math Battle? You can support the creator with ₹5 or ₹10. Support is completely optional.',
    phonepe_qr_subtitle: 'Scan using PhonePe or any UPI App',
    qr_placeholder_tag: 'Real PhonePe QR Placeholder',
    qr_file_location: 'Expected Android Resource Path:',
    qr_file_path: 'app/src/main/res/drawable/phonepe_qr.png',
    qr_test_upload: 'Test Real QR Image in Simulator (Drag or Click to Upload)',
    qr_optional_note: 'Every contribution directly supports Bibek\'s developer tools and future games.',
    copy_support_msg: 'Copy Creator Note',
    copied: 'Copied to clipboard!',
    
    // Settings
    settings_title: 'Settings',
    music_label: 'Background Music',
    music_desc: 'Play ambient arcade synthesizer music',
    sound_label: 'Sound Effects',
    sound_desc: 'Play audio cues for taps, correct, and wrong answers',
    language_label: 'Language (भाषा)',
    language_desc: 'Switch between English and Hindi',
    save_settings: 'Close & Save',
    reset_data: 'Reset Game Progress',
    reset_confirm: 'Are you sure you want to reset all coins, points, and theme purchases?',
    
    // Share
    share_title: 'Share Math Battle',
    share_subject: 'Try Math Battle by Bibek Kumar Tanti',
    share_text:
      'Hey! Check out Math Battle, an exciting arithmetic puzzle game built by Bibek Kumar Tanti. Test your speed in 1-Minute and 30-Second challenges, rank up through 30 levels from Bronze to Legend, and sharpen your mind!',
    share_copy_btn: 'Copy Message',
    close: 'Close',
    back: 'Back',
  },
  hi: {
    app_name: 'मैथ बैटल (Math Battle)',
    tagline: 'दिमाग तेज करें, गणित की जंग जीतें!',
    coins: 'सिक्के (Coins)',
    points: 'अंक (Points)',
    score: 'स्कोर (Score)',
    rank: 'रैंक (Rank)',
    level: 'स्तर (Level)',
    next_rank: 'अगली रैंक',
    
    // Home Cards
    menu_play: 'गेम खेलें (Play)',
    menu_play_desc: 'गणित की गति और तेज हिसाब की चुनौतियाँ',
    menu_rank: 'रैंक और पुरस्कार',
    menu_rank_desc: 'कांस्य (Bronze) से लेजेंड तक 30 सैन्य रैंक',
    menu_theme: 'थीम स्टोर',
    menu_theme_desc: 'शानदार गेम स्टाइल और नियॉन रंग अनलॉक करें',
    menu_creator: 'निर्माता के बारे में',
    menu_creator_desc: 'विवेक कुमार तांती की सच्ची कहानी',
    menu_share: 'ऐप शेयर करें',
    menu_share_desc: 'दोस्तों को अपनी गणित गति परखने के लिए आमंत्रित करें',
    menu_support: 'निर्माता का सहयोग (Support)',
    
    // Modes
    select_mode: 'गेम मोड चुनें',
    mode_1min_title: '1-मिनट चुनौती (1-Min Challenge)',
    mode_1min_desc: '60 सेकंड में अधिक से अधिक गणितीय प्रश्नों के सही उत्तर दें।',
    mode_30s_title: '30-सेकंड स्पीड रन (Speed Run)',
    mode_30s_desc: 'बिजली जैसी तेज राउंड! अपनी त्वरित प्रतिक्रिया का परीक्षण करें।',
    mode_endless_title: 'अंतहीन मोड (Endless Mode)',
    mode_endless_desc: 'बिना किसी समय सीमा के शांति से लगातार खेलें।',
    start_battle: 'जंग शुरू करें',
    
    // Gameplay
    time_left: 'बचा समय',
    seconds_abbr: 'सेकंड',
    endless_active: 'अंतहीन मुकाबला',
    finish_round: 'राउंड समाप्त करें',
    quit_confirm_title: 'क्या आप बाहर निकलना चाहते हैं?',
    quit_confirm_desc: 'आपके अर्जित सिक्के और अंक सुरक्षित रहेंगे।',
    resume: 'खेल जारी रखें',
    exit: 'बाहर निकलें',
    correct_alert: 'शाबाश! +10 स्कोर',
    wrong_alert: 'कोई बात नहीं! आगे बढ़ें',
    
    // Results
    results_title: 'मुकाबले का परिणाम',
    final_score: 'अंतिम स्कोर',
    correct_answers: 'सही उत्तर',
    incorrect_answers: 'गलत उत्तर',
    accuracy: 'सटीकता',
    total_answered: 'कुल प्रश्न',
    round_rewards: 'इस राउंड का इनाम',
    coins_earned: 'अर्जित सिक्के',
    points_earned: 'अर्जित अंक',
    new_rank_unlocked: 'नई रैंक अनलॉक हुई!',
    play_again: 'दोबारा खेलें',
    back_to_home: 'होम स्क्रीन',
    
    // Rank & Rewards
    rank_rewards_title: 'रैंक और पुरस्कार (30 स्तर)',
    rank_system_desc: 'प्रत्येक सही उत्तर पर +5 अंक प्राप्त करें और 30 स्तरों पर आगे बढ़ें।',
    current_earned_points: 'कुल अर्जित अंक',
    unlocked_status: 'अनलॉक',
    locked_status: 'लॉक',
    claimed_status: 'प्राप्त किया',
    claim_reward_btn: 'इनाम प्राप्त करें',
    already_claimed_btn: 'इनाम मिल चुका है',
    need_points: 'अंकों की आवश्यकता',
    
    // Theme Store
    theme_store_title: 'थीम स्टोर (Theme Store)',
    theme_store_desc: 'अपने मैथ बैटल का रंग-रूप बदलें। चुनी गई थीम हमेशा सुरक्षित रहेगी।',
    theme_free: 'मुफ्त डिफ़ॉल्ट',
    theme_buy: 'थीम खरीदें',
    theme_equip: 'थीम लागू करें',
    theme_equipped: 'सक्रिय है',
    not_enough_coins: 'पर्याप्त सिक्के नहीं हैं! और खेलने पर सिक्के मिलेंगे।',
    theme_bought_success: 'थीम सफलतापूर्वक खरीदी और लागू कर दी गई!',
    
    // About Creator
    about_creator_title: 'निर्माता के बारे में',
    creator_name: 'विवेक कुमार तांती (Bibek Kumar Tanti)',
    english_story_title: 'अंग्रेजी विवरण (English)',
    english_story_text:
      'My name is Bibek Kumar Tanti. I am learning programming with a passionate dream: to build engaging mobile applications and interactive games. With limited resources, using my smartphone, immense patience, and persistent curiosity, I developed Math Battle from the ground up. My goal is to make arithmetic fun and exciting for students and casual gamers alike, while continuously growing my skills as an independent Android developer. Thank you for playing and supporting my journey!',
    hindi_story_title: 'हिन्दी विवरण (Hindi)',
    hindi_story_text:
      'मेरा नाम विवेक कुमार तांती (Bibek Kumar Tanti) है। मैं गहरी लगन और उत्साह के साथ प्रोग्रामिंग सीख रहा हूँ। सीमित संसाधनों के बीच, अपने मोबाइल फोन, धैर्य, जिज्ञासा और निरंतर मेहनत के बल पर मैंने "मैथ बैटल" (Math Battle) का निर्माण किया है। मेरा उद्देश्य गणित के अभ्यास को हर छात्र और खिलाड़ी के लिए मनोरंजक बनाना है, और एक स्वतंत्र एंड्रॉइड डेवलपर के रूप में अपने कौशल को लगातार निखारना है। इस गेम को खेलने और मेरी इस यात्रा का हिस्सा बनने के लिए आपका हृदय से धन्यवाद!',
      
    // Support Screen
    support_title: 'निर्माता का समर्थन (Support)',
    support_friendly_msg:
      'Enjoying Math Battle? You can support the creator with ₹5 or ₹10. Support is completely optional.',
    phonepe_qr_subtitle: 'PhonePe या किसी भी UPI ऐप से स्कैन करें',
    qr_placeholder_tag: 'वास्तविक PhonePe QR का स्थान',
    qr_file_location: 'एंड्रॉइड रिसोर्स फोल्डर:',
    qr_file_path: 'app/src/main/res/drawable/phonepe_qr.png',
    qr_test_upload: 'सिम्युलेटर में अपना असली QR टेस्ट करें (फोटो चुनें)',
    qr_optional_note: 'यह सहयोग पूरी तरह स्वैच्छिक है और विवेक के डेवलपर सफर को सहारा देता है।',
    copy_support_msg: 'संदेश कॉपी करें',
    copied: 'कॉपी हो गया!',
    
    // Settings
    settings_title: 'सेटिंग्स (Settings)',
    music_label: 'बैकग्राउंड संगीत (Music)',
    music_desc: 'आर्केड सिंथेसाइज़र बैकग्राउंड संगीत चालू/बंद करें',
    sound_label: 'बटन ध्वनि (Sound FX)',
    sound_desc: 'क्लिक, सही और गलत उत्तर की ध्वनियाँ चालू/बंद करें',
    language_label: 'भाषा चुनें (Language)',
    language_desc: 'English या हिन्दी में स्विच करें',
    save_settings: 'सहेजें और बंद करें',
    reset_data: 'प्रगति रीसेट करें',
    reset_confirm: 'क्या आप सभी सिक्के, अंक और खरीदी गई थीम रीसेट करना चाहते हैं?',
    
    // Share
    share_title: 'मैथ बैटल शेयर करें',
    share_subject: 'विवेक कुमार तांती द्वारा निर्मित मैथ बैटल खेलें',
    share_text:
      'नमस्ते! विवेक कुमार तांती द्वारा विकसित रोमांचक गणित गेम "Math Battle" खेलें। 1-मिनट और 30-सेकंड की तेज चुनौतियों में भाग लें, कांस्य से लेजेंड तक 30 स्तरों पर जीत हासिल करें और अपना दिमाग तेज करें!',
    share_copy_btn: 'संदेश कॉपी करें',
    close: 'बंद करें',
    back: 'वापस (Back)',
  },
};
