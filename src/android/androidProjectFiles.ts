/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Complete Android Studio Project Repository Definition
 * App: Math Battle
 * Package: com.bibek.mathbattle
 */

export interface AndroidFileRecord {
  path: string;
  category: 'gradle' | 'manifest' | 'kotlin' | 'layout' | 'values' | 'drawable';
  description: string;
  content: string;
}

export const ANDROID_PROJECT_FILES: AndroidFileRecord[] = [
  // 1. Settings Gradle
  {
    path: 'settings.gradle.kts',
    category: 'gradle',
    description: 'Gradle project settings declaring the Math Battle root project and :app module',
    content: `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "Math Battle"
include(":app")
`,
  },

  // 2. Project root build.gradle.kts
  {
    path: 'build.gradle.kts',
    category: 'gradle',
    description: 'Top-level root build file with Android and Kotlin Gradle plugins',
    content: `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    id("com.android.application") version "8.3.2" apply false
    id("org.jetbrains.kotlin.android") version "1.9.23" apply false
}
`,
  },

  // 3. gradle.properties
  {
    path: 'gradle.properties',
    category: 'gradle',
    description: 'Gradle configuration properties and JVM memory arguments',
    content: `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.nonTransitiveRClass=true
kotlin.code.style=official
`,
  },

  // 4. app/build.gradle.kts
  {
    path: 'app/build.gradle.kts',
    category: 'gradle',
    description: 'App module build configuration with dependencies for com.bibek.mathbattle',
    content: `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.bibek.mathbattle"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.bibek.mathbattle"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = "1.8"
    }

    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.11.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    implementation("androidx.cardview:cardview:1.0.0")

    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}
`,
  },

  // 5. AndroidManifest.xml
  {
    path: 'app/src/main/AndroidManifest.xml',
    category: 'manifest',
    description: 'Android Manifest declaring portrait orientation and all 10 application Activities',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.bibek.mathbattle">

    <application
        android:name=".MathBattleApplication"
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.MathBattle"
        tools:targetApi="31">

        <!-- Animated Splash Screen (Launcher) -->
        <activity
            android:name=".SplashActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.MathBattle.NoActionBar.Fullscreen">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- Main Home Screen -->
        <activity
            android:name=".MainActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.MathBattle.NoActionBar" />

        <!-- Game Mode Selection Screen -->
        <activity
            android:name=".GameModeActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.MathBattle.NoActionBar" />

        <!-- Active Game Play Screen -->
        <activity
            android:name=".GamePlayActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.MathBattle.NoActionBar" />

        <!-- Game Results Screen -->
        <activity
            android:name=".GameResultActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.MathBattle.NoActionBar" />

        <!-- Rank & Rewards Screen (30 Levels) -->
        <activity
            android:name=".RankRewardsActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.MathBattle.NoActionBar" />

        <!-- Theme Store Screen (8 Themes) -->
        <activity
            android:name=".ThemeStoreActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.MathBattle.NoActionBar" />

        <!-- About Creator Screen (Bibek Kumar Tanti EN/HI) -->
        <activity
            android:name=".AboutCreatorActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.MathBattle.NoActionBar" />

        <!-- Settings Screen (Music, Sounds, Language) -->
        <activity
            android:name=".SettingsActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.MathBattle.NoActionBar" />

        <!-- Creator Support Screen (PhonePe QR Placeholder) -->
        <activity
            android:name=".SupportActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.MathBattle.NoActionBar" />

    </application>

</manifest>
`,
  },

  // 6. MathBattleApplication.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/MathBattleApplication.kt',
    category: 'kotlin',
    description: 'Application class initializing SharedPreferences, Audio, and Locale settings',
    content: `package com.bibek.mathbattle

import android.app.Application
import com.bibek.mathbattle.manager.GameDataManager
import com.bibek.mathbattle.manager.SoundManager

class MathBattleApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        // Initialize singletons for persistence and audio
        GameDataManager.init(this)
        SoundManager.init(this)

        // Apply saved language at startup
        GameDataManager.applyLocale(this)
    }
}
`,
  },

  // 7. MathQuestion.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/model/MathQuestion.kt',
    category: 'kotlin',
    description: 'Model for arithmetic questions with 4 distinct choices',
    content: `package com.bibek.mathbattle.model

data class MathQuestion(
    val id: String,
    val operand1: Int,
    val operand2: Int,
    val operator: String,
    val displayText: String,
    val correctAnswer: Int,
    val options: List<Int>
)
`,
  },

  // 8. RankTier.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/model/RankTier.kt',
    category: 'kotlin',
    description: '30-level military rank definitions, cumulative thresholds, and reward amounts',
    content: `package com.bibek.mathbattle.model

data class RankLevel(
    val levelNumber: Int, // 1 to 30
    val tierName: String, // Bronze, Silver, Gold, Platinum, Diamond, Legend
    val subLevel: String, // I, II, III, IV, V
    val fullName: String,
    val cumulativeThreshold: Int, // Total earned points needed
    val incrementalRequirement: Int, // Incremental points needed for this level
    val coinReward: Int
)

object RankSystem {
    private val TIERS = listOf(
        Pair("Bronze", 100),
        Pair("Silver", 150),
        Pair("Gold", 250),
        Pair("Platinum", 400),
        Pair("Diamond", 600),
        Pair("Legend", 1000)
    )
    private val SUB_LEVELS = listOf("I", "II", "III", "IV", "V")

    val ALL_LEVELS: List<RankLevel> by lazy {
        val list = mutableListOf<RankLevel>()
        var cumulative = 0
        var incremental = 200 // Level 1 threshold

        for (i in 1..30) {
            val tierIndex = (i - 1) / 5
            val subIndex = (i - 1) % 5
            val (tierName, reward) = TIERS[tierIndex]
            val sub = SUB_LEVELS[subIndex]

            if (i == 1) {
                incremental = 200
            } else {
                incremental += 50
            }
            cumulative += incremental

            list.add(
                RankLevel(
                    levelNumber = i,
                    tierName = tierName,
                    subLevel = sub,
                    fullName = "$tierName $sub",
                    cumulativeThreshold = cumulative,
                    incrementalRequirement = incremental,
                    coinReward = reward
                )
            )
        }
        list
    }

    fun getCurrentRank(totalEarnedPoints: Int): Pair<RankLevel?, RankLevel> {
        var current: RankLevel? = null
        for (lvl in ALL_LEVELS) {
            if (totalEarnedPoints >= lvl.cumulativeThreshold) {
                current = lvl
            } else {
                return Pair(current, lvl)
            }
        }
        // At max level
        return Pair(ALL_LEVELS.last(), ALL_LEVELS.last())
    }
}
`,
  },

  // 9. ThemeItem.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/model/ThemeItem.kt',
    category: 'kotlin',
    description: 'Theme models and configuration for the 8 available game themes',
    content: `package com.bibek.mathbattle.model

data class ThemeItem(
    val id: String,
    val name: String,
    val cost: Int,
    val primaryColorHex: String,
    val isDefault: Boolean = false
)

object ThemeRegistry {
    val THEMES = listOf(
        ThemeItem("ocean_blue", "Ocean Blue", 0, "#1976D2", true),
        ThemeItem("neon_purple", "Neon Purple", 500, "#7B1FA2"),
        ThemeItem("forest_green", "Forest Green", 500, "#388E3C"),
        ThemeItem("sunset_orange", "Sunset Orange", 600, "#E64A19"),
        ThemeItem("midnight_black", "Midnight Black", 750, "#212121"),
        ThemeItem("candy_pink", "Candy Pink", 600, "#C2185B"),
        ThemeItem("golden_royale", "Golden Royale", 1000, "#FFA000"),
        ThemeItem("cyber_cyan", "Cyber Cyan", 800, "#0097A7")
    )

    fun getThemeById(id: String): ThemeItem {
        return THEMES.find { it.id == id } ?: THEMES[0]
    }
}
`,
  },

  // 10. GameDataManager.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/manager/GameDataManager.kt',
    category: 'kotlin',
    description: 'Local SharedPreferences persistence for coins, earned points, ranks, themes, and settings',
    content: `package com.bibek.mathbattle.manager

import android.content.Context
import android.content.SharedPreferences
import android.content.res.Configuration
import java.util.Locale

object GameDataManager {
    private const val PREF_NAME = "MathBattlePrefs"
    private const val KEY_COINS = "total_coins"
    private const val KEY_EARNED_POINTS = "total_earned_points"
    private const val KEY_CLAIMED_REWARDS = "claimed_rewards"
    private const val KEY_OWNED_THEMES = "owned_themes"
    private const val KEY_EQUIPPED_THEME = "equipped_theme"
    private const val KEY_MUSIC_ENABLED = "music_enabled"
    private const val KEY_SOUND_ENABLED = "sound_enabled"
    private const val KEY_LANGUAGE = "language_code"

    private lateinit var prefs: SharedPreferences

    fun init(context: Context) {
        prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
    }

    var totalCoins: Int
        get() = prefs.getInt(KEY_COINS, 0)
        set(value) = prefs.edit().putInt(KEY_COINS, value).apply()

    fun addCoins(amount: Int) {
        if (amount > 0) {
            totalCoins += amount
        }
    }

    fun spendCoins(amount: Int): Boolean {
        if (amount > 0 && totalCoins >= amount) {
            totalCoins -= amount
            return true
        }
        return false
    }

    var totalEarnedPoints: Int
        get() = prefs.getInt(KEY_EARNED_POINTS, 0)
        set(value) = prefs.edit().putInt(KEY_EARNED_POINTS, value).apply()

    fun addEarnedPoints(amount: Int) {
        if (amount > 0) {
            totalEarnedPoints += amount
        }
    }

    fun isRewardClaimed(levelNumber: Int): Boolean {
        val set = prefs.getStringSet(KEY_CLAIMED_REWARDS, emptySet()) ?: emptySet()
        return set.contains(levelNumber.toString())
    }

    fun markRewardClaimed(levelNumber: Int) {
        val currentSet = prefs.getStringSet(KEY_CLAIMED_REWARDS, emptySet())?.toMutableSet() ?: mutableSetOf()
        currentSet.add(levelNumber.toString())
        prefs.edit().putStringSet(KEY_CLAIMED_REWARDS, currentSet).apply()
    }

    fun isThemeOwned(themeId: String): Boolean {
        if (themeId == "ocean_blue") return true
        val set = prefs.getStringSet(KEY_OWNED_THEMES, emptySet()) ?: emptySet()
        return set.contains(themeId)
    }

    fun markThemeOwned(themeId: String) {
        val currentSet = prefs.getStringSet(KEY_OWNED_THEMES, emptySet())?.toMutableSet() ?: mutableSetOf()
        currentSet.add(themeId)
        prefs.edit().putStringSet(KEY_OWNED_THEMES, currentSet).apply()
    }

    var equippedTheme: String
        get() = prefs.getString(KEY_EQUIPPED_THEME, "ocean_blue") ?: "ocean_blue"
        set(value) = prefs.edit().putString(KEY_EQUIPPED_THEME, value).apply()

    var isMusicEnabled: Boolean
        get() = prefs.getBoolean(KEY_MUSIC_ENABLED, true)
        set(value) = prefs.edit().putBoolean(KEY_MUSIC_ENABLED, value).apply()

    var isSoundEnabled: Boolean
        get() = prefs.getBoolean(KEY_SOUND_ENABLED, true)
        set(value) = prefs.edit().putBoolean(KEY_SOUND_ENABLED, value).apply()

    var languageCode: String
        get() = prefs.getString(KEY_LANGUAGE, "en") ?: "en"
        set(value) = prefs.edit().putString(KEY_LANGUAGE, value).apply()

    fun applyLocale(context: Context) {
        val lang = languageCode
        val locale = Locale(lang)
        Locale.setDefault(locale)
        val config = Configuration(context.resources.configuration)
        config.setLocale(locale)
        context.resources.updateConfiguration(config, context.resources.displayMetrics)
    }
}
`,
  },

  // 11. QuestionGenerator.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/manager/QuestionGenerator.kt',
    category: 'kotlin',
    description: 'Generates arithmetic questions (+, −, ×, ÷) with non-negative subtraction and whole-number division',
    content: `package com.bibek.mathbattle.manager

import com.bibek.mathbattle.model.MathQuestion
import java.util.UUID
import kotlin.random.Random

object QuestionGenerator {

    private val operators = listOf("+", "−", "×", "÷")

    fun generate(previousDisplayText: String? = null): MathQuestion {
        var attempts = 0
        while (attempts < 20) {
            attempts++
            val op = operators.random()
            var operand1 = 0
            var operand2 = 0
            var correctAnswer = 0

            when (op) {
                "+" -> {
                    operand1 = Random.nextInt(2, 45)
                    operand2 = Random.nextInt(2, 45)
                    correctAnswer = operand1 + operand2
                }
                "−" -> {
                    val a = Random.nextInt(5, 60)
                    val b = Random.nextInt(2, a + 1)
                    operand1 = a
                    operand2 = b
                    correctAnswer = operand1 - operand2
                }
                "×" -> {
                    operand1 = Random.nextInt(2, 13)
                    operand2 = Random.nextInt(2, 13)
                    correctAnswer = operand1 * operand2
                }
                "÷" -> {
                    operand2 = Random.nextInt(2, 13) // Non-zero divisor
                    val quotient = Random.nextInt(1, 16)
                    operand1 = operand2 * quotient // Whole-number division
                    correctAnswer = quotient
                }
            }

            val displayText = "$operand1 $op $operand2 = ?"
            if (previousDisplayText != null && displayText == previousDisplayText && attempts < 15) {
                continue
            }

            // Generate 3 unique wrong options
            val wrongOptions = mutableSetOf<Int>()
            val offsets = listOf(-3, -2, -1, 1, 2, 3, 4, 5, 10, -10).shuffled()

            for (off in offsets) {
                val candidate = correctAnswer + off
                if (candidate >= 0 && candidate != correctAnswer) {
                    wrongOptions.add(candidate)
                }
                if (wrongOptions.size == 3) break
            }

            var filler = 1
            while (wrongOptions.size < 3) {
                val candidate = correctAnswer + filler
                if (candidate >= 0 && candidate != correctAnswer) {
                    wrongOptions.add(candidate)
                }
                filler += 2
            }

            val allOptions = (wrongOptions.toList() + correctAnswer).shuffled()

            return MathQuestion(
                id = UUID.randomUUID().toString(),
                operand1 = operand1,
                operand2 = operand2,
                operator = op,
                displayText = displayText,
                correctAnswer = correctAnswer,
                options = allOptions
            )
        }

        // Guaranteed safe fallback
        return MathQuestion(
            id = "fallback",
            operand1 = 8,
            operand2 = 7,
            operator = "+",
            displayText = "8 + 7 = ?",
            correctAnswer = 15,
            options = listOf(13, 14, 15, 16)
        )
    }
}
`,
  },

  // 12. SoundManager.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/manager/SoundManager.kt',
    category: 'kotlin',
    description: 'Android audio controller with ToneGenerator fallback for button clicks, correct/wrong sounds, and music',
    content: `package com.bibek.mathbattle.manager

import android.content.Context
import android.media.AudioAttributes
import android.media.AudioManager
import android.media.SoundPool
import android.media.ToneGenerator

object SoundManager {
    private var toneGenerator: ToneGenerator? = null

    fun init(context: Context) {
        try {
            toneGenerator = ToneGenerator(AudioManager.STREAM_MUSIC, 60)
        } catch (e: Exception) {
            toneGenerator = null
        }
    }

    fun playButtonClick() {
        if (!GameDataManager.isSoundEnabled) return
        try {
            toneGenerator?.startTone(ToneGenerator.TONE_PROP_BEEP, 40)
        } catch (_: Exception) {}
    }

    fun playCorrectSound() {
        if (!GameDataManager.isSoundEnabled) return
        try {
            toneGenerator?.startTone(ToneGenerator.TONE_CDMA_ALERT_CALL_GUARD, 120)
        } catch (_: Exception) {}
    }

    fun playWrongSound() {
        if (!GameDataManager.isSoundEnabled) return
        try {
            toneGenerator?.startTone(ToneGenerator.TONE_PROP_BEEP2, 180)
        } catch (_: Exception) {}
    }

    fun playRewardSound() {
        if (!GameDataManager.isSoundEnabled) return
        try {
            toneGenerator?.startTone(ToneGenerator.TONE_CDMA_HIGH_L, 160)
        } catch (_: Exception) {}
    }
}
`,
  },

  // 13. SplashActivity.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/SplashActivity.kt',
    category: 'kotlin',
    description: 'Animated 5-second Splash Activity with lifecycle safety and fade/scale transitions',
    content: `package com.bibek.mathbattle

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.animation.AccelerateDecelerateInterpolator
import androidx.appcompat.app.AppCompatActivity
import com.bibek.mathbattle.databinding.ActivitySplashBinding

class SplashActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySplashBinding
    private val handler = Handler(Looper.getMainLooper())
    private var hasNavigated = false

    private val navigateRunnable = Runnable {
        if (!isFinishing && !isDestroyed && !hasNavigated) {
            hasNavigated = true
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySplashBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Visual logo animation: scale and fade-in
        binding.ivLogo.alpha = 0f
        binding.ivLogo.scaleX = 0.7f
        binding.ivLogo.scaleY = 0.7f

        binding.ivLogo.animate()
            .alpha(1f)
            .scaleX(1.05f)
            .scaleY(1.05f)
            .setDuration(1200)
            .setInterpolator(AccelerateDecelerateInterpolator())
            .withEndAction {
                binding.ivLogo.animate()
                    .scaleX(1.0f)
                    .scaleY(1.0f)
                    .setDuration(400)
                    .start()
            }
            .start()

        // 5-second splash screen duration as specified
        handler.postDelayed(navigateRunnable, 5000)

        // Allow immediate tap to skip splash if desired
        binding.root.setOnClickListener {
            if (!hasNavigated) {
                handler.removeCallbacks(navigateRunnable)
                hasNavigated = true
                startActivity(Intent(this, MainActivity::class.java))
                finish()
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        handler.removeCallbacks(navigateRunnable)
    }
}
`,
  },

  // 14. MainActivity.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/MainActivity.kt',
    category: 'kotlin',
    description: 'Home Screen Activity with coins, rank progress, Settings, Support, and 5 main cards',
    content: `package com.bibek.mathbattle

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.bibek.mathbattle.databinding.ActivityMainBinding
import com.bibek.mathbattle.manager.GameDataManager
import com.bibek.mathbattle.manager.SoundManager
import com.bibek.mathbattle.model.RankSystem

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupListeners()
    }

    override fun onResume() {
        super.onResume()
        updateDashboardData()
    }

    private fun updateDashboardData() {
        binding.tvCoinCount.text = GameDataManager.totalCoins.toString()

        val (currentRank, nextRank) = RankSystem.getCurrentRank(GameDataManager.totalEarnedPoints)
        if (currentRank != null) {
            binding.tvRankName.text = currentRank.fullName
            binding.tvCurrentPoints.text = "\${GameDataManager.totalEarnedPoints} / \${nextRank.cumulativeThreshold} pts"
            val span = (nextRank.cumulativeThreshold - currentRank.cumulativeThreshold).coerceAtLeast(1)
            val progress = ((GameDataManager.totalEarnedPoints - currentRank.cumulativeThreshold) * 100) / span
            binding.pbRankProgress.progress = progress.coerceIn(0, 100)
        } else {
            binding.tvRankName.text = getString(R.string.unranked_novice)
            binding.tvCurrentPoints.text = "\${GameDataManager.totalEarnedPoints} / \${nextRank.cumulativeThreshold} pts"
            val progress = (GameDataManager.totalEarnedPoints * 100) / nextRank.cumulativeThreshold
            binding.pbRankProgress.progress = progress.coerceIn(0, 100)
        }
    }

    private fun setupListeners() {
        // 1. Play Game
        binding.cardPlayGame.setOnClickListener {
            SoundManager.playButtonClick()
            startActivity(Intent(this, GameModeActivity::class.java))
        }

        // 2. Rank & Rewards
        binding.cardRankRewards.setOnClickListener {
            SoundManager.playButtonClick()
            startActivity(Intent(this, RankRewardsActivity::class.java))
        }

        // 3. Theme Store
        binding.cardThemeStore.setOnClickListener {
            SoundManager.playButtonClick()
            startActivity(Intent(this, ThemeStoreActivity::class.java))
        }

        // 4. About Creator
        binding.cardAboutCreator.setOnClickListener {
            SoundManager.playButtonClick()
            startActivity(Intent(this, AboutCreatorActivity::class.java))
        }

        // 5. Share App
        binding.cardShareApp.setOnClickListener {
            SoundManager.playButtonClick()
            shareApp()
        }

        // Settings Button
        binding.btnSettings.setOnClickListener {
            SoundManager.playButtonClick()
            startActivity(Intent(this, SettingsActivity::class.java))
        }

        // Support Creator (PhonePe QR)
        binding.btnSupport.setOnClickListener {
            SoundManager.playButtonClick()
            startActivity(Intent(this, SupportActivity::class.java))
        }
    }

    private fun shareApp() {
        try {
            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = "text/plain"
                putExtra(Intent.EXTRA_SUBJECT, getString(R.string.share_subject))
                putExtra(Intent.EXTRA_TEXT, getString(R.string.share_text))
            }
            startActivity(Intent.createChooser(shareIntent, getString(R.string.share_title)))
        } catch (_: Exception) {}
    }
}
`,
  },

  // 15. GameModeActivity.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/GameModeActivity.kt',
    category: 'kotlin',
    description: 'Game mode selection screen for 1-Minute Challenge, 30-Second Speed Run, and Endless Mode',
    content: `package com.bibek.mathbattle

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.bibek.mathbattle.databinding.ActivityGameModeBinding
import com.bibek.mathbattle.manager.SoundManager

class GameModeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityGameModeBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityGameModeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnBack.setOnClickListener {
            SoundManager.playButtonClick()
            finish()
        }

        // Mode A: 1-Minute Challenge
        binding.btnStart1Min.setOnClickListener {
            SoundManager.playButtonClick()
            launchGame("one_minute", 60)
        }

        // Mode B: 30-Second Speed Run
        binding.btnStart30s.setOnClickListener {
            SoundManager.playButtonClick()
            launchGame("speed_run", 30)
        }

        // Mode C: Endless Mode
        binding.btnStartEndless.setOnClickListener {
            SoundManager.playButtonClick()
            launchGame("endless", 0)
        }
    }

    private fun launchGame(modeKey: String, durationSeconds: Int) {
        val intent = Intent(this, GamePlayActivity::class.java).apply {
            putExtra(GamePlayActivity.EXTRA_MODE_KEY, modeKey)
            putExtra(GamePlayActivity.EXTRA_DURATION_SEC, durationSeconds)
        }
        startActivity(intent)
        finish()
    }
}
`,
  },

  // 16. GamePlayActivity.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/GamePlayActivity.kt',
    category: 'kotlin',
    description: 'Active math battle gameplay, CountDownTimer, scoring, anti-double-tap lock, and answer checking',
    content: `package com.bibek.mathbattle

import android.content.Intent
import android.os.Bundle
import android.os.CountDownTimer
import android.os.Handler
import android.os.Looper
import android.widget.Button
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.bibek.mathbattle.databinding.ActivityGamePlayBinding
import com.bibek.mathbattle.manager.GameDataManager
import com.bibek.mathbattle.manager.QuestionGenerator
import com.bibek.mathbattle.manager.SoundManager
import com.bibek.mathbattle.model.MathQuestion

class GamePlayActivity : AppCompatActivity() {

    companion object {
        const val EXTRA_MODE_KEY = "extra_mode_key"
        const val EXTRA_DURATION_SEC = "extra_duration_sec"
    }

    private lateinit var binding: ActivityGamePlayBinding
    private var modeKey: String = "one_minute"
    private var durationSeconds: Int = 60

    private var score = 0
    private var correctCount = 0
    private var incorrectCount = 0
    private var questionsAnswered = 0
    private var earnedPoints = 0
    private var earnedCoins = 0

    private var currentQuestion: MathQuestion? = null
    private var isAnswerLocked = false
    private var countDownTimer: CountDownTimer? = null
    private val handler = Handler(Looper.getMainLooper())

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityGamePlayBinding.inflate(layoutInflater)
        setContentView(binding.root)

        modeKey = intent.getStringExtra(EXTRA_MODE_KEY) ?: "one_minute"
        durationSeconds = intent.getIntExtra(EXTRA_DURATION_SEC, 60)

        setupUI()
        setupListeners()
        loadNextQuestion()

        if (modeKey != "endless" && durationSeconds > 0) {
            startTimer(durationSeconds * 1000L)
        } else {
            binding.tvTimerLabel.text = getString(R.string.endless_mode)
            binding.tvTimerValue.text = "∞"
            binding.btnExitGame.text = getString(R.string.finish_round)
        }
    }

    private fun setupUI() {
        binding.tvScoreValue.text = "0"
        binding.tvQuestionsCount.text = "0"
    }

    private fun setupListeners() {
        val optionButtons = listOf(binding.btnOption1, binding.btnOption2, binding.btnOption3, binding.btnOption4)

        optionButtons.forEachIndexed { index, button ->
            button.setOnClickListener {
                if (isAnswerLocked) return@setOnClickListener
                currentQuestion?.let { q ->
                    if (index < q.options.size) {
                        handleAnswerSelected(button, q.options[index], q.correctAnswer)
                    }
                }
            }
        }

        binding.btnExitGame.setOnClickListener {
            SoundManager.playButtonClick()
            showExitConfirmation()
        }
    }

    private fun startTimer(millis: Long) {
        countDownTimer?.cancel()
        countDownTimer = object : CountDownTimer(millis, 1000L) {
            override fun onTick(millisUntilFinished: Long) {
                val secLeft = (millisUntilFinished / 1000).toInt()
                binding.tvTimerValue.text = "\${secLeft}s"
                if (secLeft <= 10) {
                    binding.tvTimerValue.setTextColor(ContextCompat.getColor(this@GamePlayActivity, R.color.accent_red))
                }
            }

            override fun onFinish() {
                binding.tvTimerValue.text = "0s"
                finishMatch()
            }
        }.start()
    }

    private fun loadNextQuestion() {
        isAnswerLocked = false
        val prevText = currentQuestion?.displayText
        val question = QuestionGenerator.generate(prevText)
        currentQuestion = question

        binding.tvQuestionText.text = question.displayText

        val buttons = listOf(binding.btnOption1, binding.btnOption2, binding.btnOption3, binding.btnOption4)
        buttons.forEachIndexed { i, btn ->
            btn.setBackgroundResource(R.drawable.bg_option_default)
            btn.isEnabled = true
            if (i < question.options.size) {
                btn.text = question.options[i].toString()
            }
        }
    }

    private fun handleAnswerSelected(selectedBtn: Button, chosenAnswer: Int, correctAnswer: Int) {
        isAnswerLocked = true
        questionsAnswered++
        binding.tvQuestionsCount.text = questionsAnswered.toString()

        val isCorrect = (chosenAnswer == correctAnswer)

        if (isCorrect) {
            score += 10
            earnedPoints += 5
            earnedCoins += 2
            correctCount++
            selectedBtn.setBackgroundResource(R.drawable.bg_option_correct)
            SoundManager.playCorrectSound()
        } else {
            incorrectCount++
            selectedBtn.setBackgroundResource(R.drawable.bg_option_wrong)
            SoundManager.playWrongSound()

            // Highlight the correct answer for clarity
            val buttons = listOf(binding.btnOption1, binding.btnOption2, binding.btnOption3, binding.btnOption4)
            currentQuestion?.options?.forEachIndexed { i, opt ->
                if (opt == correctAnswer && i < buttons.size) {
                    buttons[i].setBackgroundResource(R.drawable.bg_option_correct)
                }
            }
        }

        binding.tvScoreValue.text = score.toString()

        // Short feedback pause then advance
        handler.postDelayed({
            if (!isFinishing && !isDestroyed) {
                loadNextQuestion()
            }
        }, 450)
    }

    private fun showExitConfirmation() {
        AlertDialog.Builder(this)
            .setTitle(R.string.quit_confirm_title)
            .setMessage(R.string.quit_confirm_desc)
            .setPositiveButton(R.string.exit) { _, _ ->
                finishMatch()
            }
            .setNegativeButton(R.string.resume, null)
            .show()
    }

    private fun finishMatch() {
        countDownTimer?.cancel()

        // Record rewards locally exactly once
        GameDataManager.addCoins(earnedCoins)
        GameDataManager.addEarnedPoints(earnedPoints)

        val intent = Intent(this, GameResultActivity::class.java).apply {
            putExtra("EXTRA_MODE_KEY", modeKey)
            putExtra("EXTRA_SCORE", score)
            putExtra("EXTRA_CORRECT", correctCount)
            putExtra("EXTRA_INCORRECT", incorrectCount)
            putExtra("EXTRA_TOTAL_ANSWERED", questionsAnswered)
            putExtra("EXTRA_POINTS_EARNED", earnedPoints)
            putExtra("EXTRA_COINS_EARNED", earnedCoins)
        }
        startActivity(intent)
        finish()
    }

    override fun onDestroy() {
        super.onDestroy()
        countDownTimer?.cancel()
        handler.removeCallbacksAndMessages(null)
    }
}
`,
  },

  // 17. GameResultActivity.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/GameResultActivity.kt',
    category: 'kotlin',
    description: 'Results screen showing round score, points, coins, totals, Play Again and Home navigation',
    content: `package com.bibek.mathbattle

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.bibek.mathbattle.databinding.ActivityGameResultBinding
import com.bibek.mathbattle.manager.GameDataManager
import com.bibek.mathbattle.manager.SoundManager

class GameResultActivity : AppCompatActivity() {

    private lateinit var binding: ActivityGameResultBinding
    private var modeKey: String = "one_minute"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityGameResultBinding.inflate(layoutInflater)
        setContentView(binding.root)

        modeKey = intent.getStringExtra("EXTRA_MODE_KEY") ?: "one_minute"
        val score = intent.getIntExtra("EXTRA_SCORE", 0)
        val correct = intent.getIntExtra("EXTRA_CORRECT", 0)
        val incorrect = intent.getIntExtra("EXTRA_INCORRECT", 0)
        val totalAnswered = intent.getIntExtra("EXTRA_TOTAL_ANSWERED", 0)
        val pointsEarned = intent.getIntExtra("EXTRA_POINTS_EARNED", 0)
        val coinsEarned = intent.getIntExtra("EXTRA_COINS_EARNED", 0)

        // Display results
        binding.tvResultMode.text = when (modeKey) {
            "speed_run" -> getString(R.string.mode_30s_title)
            "endless" -> getString(R.string.mode_endless_title)
            else -> getString(R.string.mode_1min_title)
        }

        binding.tvFinalScore.text = score.toString()
        binding.tvCorrectCount.text = correct.toString()
        binding.tvIncorrectCount.text = incorrect.toString()
        binding.tvTotalAnswered.text = totalAnswered.toString()

        val accuracy = if (totalAnswered > 0) (correct * 100) / totalAnswered else 0
        binding.tvAccuracy.text = "$accuracy%"

        binding.tvEarnedPoints.text = "+$pointsEarned"
        binding.tvEarnedCoins.text = "+$coinsEarned"
        binding.tvTotalCoins.text = GameDataManager.totalCoins.toString()
        binding.tvTotalPoints.text = GameDataManager.totalEarnedPoints.toString()

        SoundManager.playRewardSound()

        // Play Again
        binding.btnPlayAgain.setOnClickListener {
            SoundManager.playButtonClick()
            val intent = Intent(this, GamePlayActivity::class.java).apply {
                putExtra(GamePlayActivity.EXTRA_MODE_KEY, modeKey)
                putExtra(
                    GamePlayActivity.EXTRA_DURATION_SEC,
                    if (modeKey == "speed_run") 30 else if (modeKey == "endless") 0 else 60
                )
            }
            startActivity(intent)
            finish()
        }

        // Return Home
        binding.btnHome.setOnClickListener {
            SoundManager.playButtonClick()
            val intent = Intent(this, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
            }
            startActivity(intent)
            finish()
        }
    }
}
`,
  },

  // 18. RankRewardsActivity.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/RankRewardsActivity.kt',
    category: 'kotlin',
    description: 'Displays the 30 rank levels, lock/unlock states, and one-time claimable coin rewards',
    content: `package com.bibek.mathbattle

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bibek.mathbattle.databinding.ActivityRankRewardsBinding
import com.bibek.mathbattle.manager.GameDataManager
import com.bibek.mathbattle.manager.SoundManager
import com.bibek.mathbattle.model.RankLevel
import com.bibek.mathbattle.model.RankSystem

class RankRewardsActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRankRewardsBinding
    private lateinit var adapter: RankLevelAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRankRewardsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnBack.setOnClickListener {
            SoundManager.playButtonClick()
            finish()
        }

        updateHeader()

        binding.rvRanks.layoutManager = LinearLayoutManager(this)
        adapter = RankLevelAdapter(RankSystem.ALL_LEVELS) { level ->
            claimReward(level)
        }
        binding.rvRanks.adapter = adapter
    }

    private fun updateHeader() {
        binding.tvCurrentPointsHeader.text = getString(R.string.current_points_label, GameDataManager.totalEarnedPoints)
    }

    private fun claimReward(level: RankLevel) {
        val totalPoints = GameDataManager.totalEarnedPoints
        val isUnlocked = totalPoints >= level.cumulativeThreshold
        val isClaimed = GameDataManager.isRewardClaimed(level.levelNumber)

        if (!isUnlocked) {
            Toast.makeText(this, getString(R.string.reward_locked_msg), Toast.LENGTH_SHORT).show()
            return
        }
        if (isClaimed) {
            Toast.makeText(this, getString(R.string.reward_already_claimed), Toast.LENGTH_SHORT).show()
            return
        }

        // Award coins once
        GameDataManager.markRewardClaimed(level.levelNumber)
        GameDataManager.addCoins(level.coinReward)
        SoundManager.playRewardSound()

        Toast.makeText(this, "+\${level.coinReward} \${getString(R.string.coins_awarded)}", Toast.LENGTH_SHORT).show()
        adapter.notifyDataSetChanged()
    }

    inner class RankLevelAdapter(
        private val list: List<RankLevel>,
        private val onClaimClick: (RankLevel) -> Unit
    ) : RecyclerView.Adapter<RankLevelAdapter.ViewHolder>() {

        inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
            val tvName: TextView = itemView.findViewById(R.id.tvRankTitle)
            val tvReq: TextView = itemView.findViewById(R.id.tvRequirement)
            val tvReward: TextView = itemView.findViewById(R.id.tvRewardAmount)
            val btnClaim: Button = itemView.findViewById(R.id.btnClaim)
        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val v = LayoutInflater.from(parent.context).inflate(R.layout.item_rank_level, parent, false)
            return ViewHolder(v)
        }

        override fun onBindViewHolder(holder: ViewHolder, position: Int) {
            val item = list[position]
            val totalPoints = GameDataManager.totalEarnedPoints
            val isUnlocked = totalPoints >= item.cumulativeThreshold
            val isClaimed = GameDataManager.isRewardClaimed(item.levelNumber)

            holder.tvName.text = item.fullName
            holder.tvReq.text = "\${item.cumulativeThreshold} pts needed"
            holder.tvReward.text = "+\${item.coinReward} Coins"

            when {
                isClaimed -> {
                    holder.btnClaim.text = getString(R.string.claimed_status)
                    holder.btnClaim.isEnabled = false
                    holder.btnClaim.setBackgroundColor(ContextCompat.getColor(this@RankRewardsActivity, R.color.text_muted))
                }
                isUnlocked -> {
                    holder.btnClaim.text = getString(R.string.claim_reward_btn)
                    holder.btnClaim.isEnabled = true
                    holder.btnClaim.setBackgroundColor(ContextCompat.getColor(this@RankRewardsActivity, R.color.accent_green))
                    holder.btnClaim.setOnClickListener { onClaimClick(item) }
                }
                else -> {
                    holder.btnClaim.text = getString(R.string.locked_status)
                    holder.btnClaim.isEnabled = false
                    holder.btnClaim.setBackgroundColor(ContextCompat.getColor(this@RankRewardsActivity, R.color.card_border))
                }
            }
        }

        override fun getItemCount(): Int = list.size
    }
}
`,
  },

  // 19. ThemeStoreActivity.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/ThemeStoreActivity.kt',
    category: 'kotlin',
    description: 'Displays 8 themes, coin balance, single-charge coin purchases, equipping, and persistence',
    content: `package com.bibek.mathbattle

import android.graphics.Color
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bibek.mathbattle.databinding.ActivityThemeStoreBinding
import com.bibek.mathbattle.manager.GameDataManager
import com.bibek.mathbattle.manager.SoundManager
import com.bibek.mathbattle.model.ThemeItem
import com.bibek.mathbattle.model.ThemeRegistry

class ThemeStoreActivity : AppCompatActivity() {

    private lateinit var binding: ActivityThemeStoreBinding
    private lateinit var adapter: ThemeAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityThemeStoreBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnBack.setOnClickListener {
            SoundManager.playButtonClick()
            finish()
        }

        updateCoinDisplay()

        binding.rvThemes.layoutManager = LinearLayoutManager(this)
        adapter = ThemeAdapter(ThemeRegistry.THEMES)
        binding.rvThemes.adapter = adapter
    }

    private fun updateCoinDisplay() {
        binding.tvCoinBalance.text = GameDataManager.totalCoins.toString()
    }

    inner class ThemeAdapter(private val themes: List<ThemeItem>) :
        RecyclerView.Adapter<ThemeAdapter.ViewHolder>() {

        inner class ViewHolder(v: View) : RecyclerView.ViewHolder(v) {
            val tvName: TextView = v.findViewById(R.id.tvThemeName)
            val tvCost: TextView = v.findViewById(R.id.tvThemeCost)
            val colorPreview: View = v.findViewById(R.id.viewColorPreview)
            val btnAction: Button = v.findViewById(R.id.btnThemeAction)
        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val v = LayoutInflater.from(parent.context).inflate(R.layout.item_theme, parent, false)
            return ViewHolder(v)
        }

        override fun onBindViewHolder(holder: ViewHolder, position: Int) {
            val theme = themes[position]
            val isOwned = GameDataManager.isThemeOwned(theme.id)
            val isEquipped = (GameDataManager.equippedTheme == theme.id)

            holder.tvName.text = theme.name
            holder.tvCost.text = if (theme.cost == 0) getString(R.string.theme_free) else "\${theme.cost} Coins"
            holder.colorPreview.setBackgroundColor(Color.parseColor(theme.primaryColorHex))

            when {
                isEquipped -> {
                    holder.btnAction.text = getString(R.string.theme_equipped)
                    holder.btnAction.isEnabled = false
                }
                isOwned -> {
                    holder.btnAction.text = getString(R.string.theme_equip)
                    holder.btnAction.isEnabled = true
                    holder.btnAction.setOnClickListener {
                        SoundManager.playButtonClick()
                        GameDataManager.equippedTheme = theme.id
                        Toast.makeText(this@ThemeStoreActivity, "\${theme.name} \${getString(R.string.theme_equipped)}", Toast.LENGTH_SHORT).show()
                        notifyDataSetChanged()
                    }
                }
                else -> {
                    holder.btnAction.text = getString(R.string.theme_buy)
                    holder.btnAction.isEnabled = true
                    holder.btnAction.setOnClickListener {
                        SoundManager.playButtonClick()
                        if (GameDataManager.spendCoins(theme.cost)) {
                            GameDataManager.markThemeOwned(theme.id)
                            GameDataManager.equippedTheme = theme.id
                            SoundManager.playRewardSound()
                            Toast.makeText(this@ThemeStoreActivity, getString(R.string.theme_bought_success), Toast.LENGTH_SHORT).show()
                            updateCoinDisplay()
                            notifyDataSetChanged()
                        } else {
                            Toast.makeText(this@ThemeStoreActivity, getString(R.string.not_enough_coins), Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            }
        }

        override fun getItemCount(): Int = themes.size
    }
}
`,
  },

  // 20. AboutCreatorActivity.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/AboutCreatorActivity.kt',
    category: 'kotlin',
    description: 'Polished About Creator screen with Bibek Kumar Tanti story in English and Hindi',
    content: `package com.bibek.mathbattle

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.bibek.mathbattle.databinding.ActivityAboutCreatorBinding
import com.bibek.mathbattle.manager.SoundManager

class AboutCreatorActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAboutCreatorBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAboutCreatorBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnBack.setOnClickListener {
            SoundManager.playButtonClick()
            finish()
        }

        binding.tvCreatorName.text = getString(R.string.creator_name)
        binding.tvEnglishTitle.text = getString(R.string.english_story_title)
        binding.tvEnglishText.text = getString(R.string.english_story_text)

        binding.tvHindiTitle.text = getString(R.string.hindi_story_title)
        binding.tvHindiText.text = getString(R.string.hindi_story_text)
    }
}
`,
  },

  // 21. SettingsActivity.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/SettingsActivity.kt',
    category: 'kotlin',
    description: 'Functional Settings Activity with music toggle, sound FX toggle, and Hindi/English language switch',
    content: `package com.bibek.mathbattle

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.bibek.mathbattle.databinding.ActivitySettingsBinding
import com.bibek.mathbattle.manager.GameDataManager
import com.bibek.mathbattle.manager.SoundManager

class SettingsActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySettingsBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySettingsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnBack.setOnClickListener {
            SoundManager.playButtonClick()
            finish()
        }

        // Music toggle
        binding.switchMusic.isChecked = GameDataManager.isMusicEnabled
        binding.switchMusic.setOnCheckedChangeListener { _, isChecked ->
            GameDataManager.isMusicEnabled = isChecked
        }

        // Sound Effects toggle
        binding.switchSounds.isChecked = GameDataManager.isSoundEnabled
        binding.switchSounds.setOnCheckedChangeListener { _, isChecked ->
            GameDataManager.isSoundEnabled = isChecked
        }

        // Language selection
        if (GameDataManager.languageCode == "hi") {
            binding.rbHindi.isChecked = true
        } else {
            binding.rbEnglish.isChecked = true
        }

        binding.rgLanguage.setOnCheckedChangeListener { _, checkedId ->
            val newLang = if (checkedId == R.id.rbHindi) "hi" else "en"
            if (newLang != GameDataManager.languageCode) {
                GameDataManager.languageCode = newLang
                GameDataManager.applyLocale(this)
                restartActivityToApplyLanguage()
            }
        }
    }

    private fun restartActivityToApplyLanguage() {
        val intent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        startActivity(intent)
        finish()
    }
}
`,
  },

  // 22. SupportActivity.kt
  {
    path: 'app/src/main/java/com/bibek/mathbattle/SupportActivity.kt',
    category: 'kotlin',
    description: 'Dedicated Support Screen with safe PhonePe QR image check and fallback placeholder',
    content: `package com.bibek.mathbattle

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.bibek.mathbattle.databinding.ActivitySupportBinding
import com.bibek.mathbattle.manager.SoundManager

class SupportActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySupportBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySupportBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnBack.setOnClickListener {
            SoundManager.playButtonClick()
            finish()
        }

        // Safe dynamic check for real phonepe_qr.png in drawable folder
        val qrResId = resources.getIdentifier("phonepe_qr", "drawable", packageName)
        if (qrResId != 0) {
            // Real QR image was added by the developer!
            binding.ivPhonePeQR.setImageResource(qrResId)
            binding.tvPlaceholderInfo.visibility = View.GONE
        } else {
            // Clean vector placeholder shown safely without causing any build or runtime error
            binding.ivPhonePeQR.setImageResource(R.drawable.phonepe_qr_placeholder)
            binding.tvPlaceholderInfo.visibility = View.VISIBLE
        }
    }
}
`,
  },

  // 23. res/values/colors.xml
  {
    path: 'app/src/main/res/values/colors.xml',
    category: 'values',
    description: 'Color palette definition for Math Battle themes and UI components',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_blue">#1E88E5</color>
    <color name="primary_blue_dark">#0D47A1</color>
    <color name="accent_gold">#FFD54F</color>
    <color name="accent_green">#4CAF50</color>
    <color name="accent_red">#E53935</color>
    
    <color name="bg_dark">#0F172A</color>
    <color name="bg_card">#1E293B</color>
    <color name="card_border">#334155</color>
    <color name="text_white">#F8FAFC</color>
    <color name="text_muted">#94A3B8</color>
    
    <color name="phonepe_purple">#5F259F</color>
    <color name="phonepe_purple_dark">#47137D</color>
</resources>
`,
  },

  // 24. res/values/strings.xml (English)
  {
    path: 'app/src/main/res/values/strings.xml',
    category: 'values',
    description: 'Default English localized strings for Math Battle',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Math Battle</string>
    <string name="tagline">Sharpen Your Mind, Conquer Math!</string>
    <string name="unranked_novice">Unranked (Novice)</string>
    
    <!-- Home Menu -->
    <string name="menu_play">Play Game</string>
    <string name="menu_rank">Rank &amp; Rewards</string>
    <string name="menu_theme">Theme Store</string>
    <string name="menu_creator">About Creator</string>
    <string name="menu_share">Share App</string>
    <string name="menu_support">Support Creator</string>
    
    <!-- Game Modes -->
    <string name="select_mode">Select Game Mode</string>
    <string name="mode_1min_title">1-Minute Challenge</string>
    <string name="mode_1min_desc">Answer as many arithmetic questions as you can in 60 seconds.</string>
    <string name="mode_30s_title">30-Second Speed Run</string>
    <string name="mode_30s_desc">Lightning round! Push your calculation speed.</string>
    <string name="mode_endless_title">Endless Mode</string>
    <string name="mode_endless_desc">Continuous casual arithmetic with no timer pressure.</string>
    <string name="start_battle">Start</string>
    
    <!-- Gameplay -->
    <string name="time_left">Time</string>
    <string name="score_label">Score</string>
    <string name="endless_mode">Endless Mode</string>
    <string name="finish_round">Finish</string>
    <string name="quit_confirm_title">Exit Match?</string>
    <string name="quit_confirm_desc">Your earned points and coins will still be saved.</string>
    <string name="resume">Resume</string>
    <string name="exit">Exit</string>
    
    <!-- Results -->
    <string name="results_title">Battle Results</string>
    <string name="play_again">Play Again</string>
    <string name="back_to_home">Home</string>
    
    <!-- Ranks -->
    <string name="rank_rewards_title">Ranks &amp; Rewards (30 Levels)</string>
    <string name="current_points_label">Total Points: %1$d</string>
    <string name="unlocked_status">Unlocked</string>
    <string name="locked_status">Locked</string>
    <string name="claimed_status">Claimed</string>
    <string name="claim_reward_btn">Claim</string>
    <string name="coins_awarded">Coins Added!</string>
    <string name="reward_locked_msg">Reach required points to unlock this rank reward.</string>
    <string name="reward_already_claimed">This reward has already been claimed.</string>
    
    <!-- Themes -->
    <string name="theme_store_title">Theme Store</string>
    <string name="theme_free">Free Default</string>
    <string name="theme_buy">Buy</string>
    <string name="theme_equip">Equip</string>
    <string name="theme_equipped">Equipped</string>
    <string name="theme_bought_success">Theme purchased and equipped!</string>
    <string name="not_enough_coins">Not enough coins! Play more battles to earn.</string>
    
    <!-- Creator -->
    <string name="about_creator_title">About the Creator</string>
    <string name="creator_name">Bibek Kumar Tanti</string>
    <string name="english_story_title">Creator Story (English)</string>
    <string name="english_story_text">My name is Bibek Kumar Tanti. I am learning programming with a passionate dream: to build engaging mobile applications and interactive games. With limited resources, using my smartphone, immense patience, and persistent curiosity, I developed Math Battle from the ground up. My goal is to make arithmetic fun and exciting for students and casual gamers alike, while continuously growing my skills as an independent Android developer. Thank you for playing and supporting my journey!</string>
    
    <string name="hindi_story_title">निर्माता की कहानी (Hindi)</string>
    <string name="hindi_story_text">मेरा नाम विवेक कुमार तांती (Bibek Kumar Tanti) है। मैं गहरी लगन और उत्साह के साथ प्रोग्रामिंग सीख रहा हूँ। सीमित संसाधनों के बीच, अपने मोबाइल फोन, धैर्य, जिज्ञासा और निरंतर मेहनत के बल पर मैंने "मैथ बैटल" (Math Battle) का निर्माण किया है। मेरा उद्देश्य गणित के अभ्यास को हर छात्र और खिलाड़ी के लिए मनोरंजक बनाना है, और एक स्वतंत्र एंड्रॉइड डेवलपर के रूप में अपने कौशल को लगातार निखारना है। इस गेम को खेलने और मेरी इस यात्रा का हिस्सा बनने के लिए आपका हृदय से धन्यवाद!</string>
    
    <!-- Support -->
    <string name="support_title">Support the Creator</string>
    <string name="support_friendly_msg">Enjoying Math Battle? You can support the creator with ₹5 or ₹10. Support is completely optional.</string>
    <string name="support_scan_hint">Scan with PhonePe or any UPI App</string>
    <string name="support_placeholder_hint">Place your real QR image at: app/src/main/res/drawable/phonepe_qr.png</string>
    
    <!-- Settings -->
    <string name="settings_title">Settings</string>
    <string name="music_label">Background Music</string>
    <string name="sound_label">Sound Effects</string>
    <string name="language_label">Language (भाषा)</string>
    <string name="lang_english">English</string>
    <string name="lang_hindi">हिन्दी (Hindi)</string>
    
    <!-- Share -->
    <string name="share_title">Share Math Battle</string>
    <string name="share_subject">Check out Math Battle by Bibek Kumar Tanti</string>
    <string name="share_text">Hey! Check out Math Battle, an exciting arithmetic puzzle game built by Bibek Kumar Tanti. Test your speed in 1-Minute and 30-Second challenges, rank up through 30 levels from Bronze to Legend, and sharpen your mind!</string>
</resources>
`,
  },

  // 25. res/values-hi/strings.xml (Hindi)
  {
    path: 'app/src/main/res/values-hi/strings.xml',
    category: 'values',
    description: 'Hindi localized strings for com.bibek.mathbattle',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">मैथ बैटल</string>
    <string name="tagline">दिमाग तेज करें, गणित की जंग जीतें!</string>
    <string name="unranked_novice">शुरुआती खिलाड़ी (Novice)</string>
    
    <!-- Home Menu -->
    <string name="menu_play">गेम खेलें</string>
    <string name="menu_rank">रैंक और पुरस्कार</string>
    <string name="menu_theme">थीम स्टोर</string>
    <string name="menu_creator">निर्माता के बारे में</string>
    <string name="menu_share">ऐप शेयर करें</string>
    <string name="menu_support">निर्माता का समर्थन</string>
    
    <!-- Game Modes -->
    <string name="select_mode">गेम मोड चुनें</string>
    <string name="mode_1min_title">1-मिनट चुनौती</string>
    <string name="mode_1min_desc">60 सेकंड में अधिक से अधिक गणितीय प्रश्नों के उत्तर दें।</string>
    <string name="mode_30s_title">30-सेकंड स्पीड रन</string>
    <string name="mode_30s_desc">बिजली जैसी तेज गति से सवालों के जवाब दें।</string>
    <string name="mode_endless_title">अंतहीन मोड</string>
    <string name="mode_endless_desc">बिना किसी समय सीमा के आराम से अभ्यास करें।</string>
    <string name="start_battle">शुरू करें</string>
    
    <!-- Gameplay -->
    <string name="time_left">समय</string>
    <string name="score_label">स्कोर</string>
    <string name="endless_mode">अंतहीन मोड</string>
    <string name="finish_round">समाप्त करें</string>
    <string name="quit_confirm_title">बाहर निकलें?</string>
    <string name="quit_confirm_desc">आपके अर्जित सिक्के और अंक सहेजे जाएंगे।</string>
    <string name="resume">जारी रखें</string>
    <string name="exit">बाहर निकलें</string>
    
    <!-- Results -->
    <string name="results_title">परिणाम</string>
    <string name="play_again">दोबारा खेलें</string>
    <string name="back_to_home">होम</string>
    
    <!-- Ranks -->
    <string name="rank_rewards_title">रैंक और पुरस्कार (30 स्तर)</string>
    <string name="current_points_label">कुल अर्जित अंक: %1$d</string>
    <string name="unlocked_status">अनलॉक</string>
    <string name="locked_status">लॉक</string>
    <string name="claimed_status">प्राप्त किया</string>
    <string name="claim_reward_btn">प्राप्त करें</string>
    <string name="coins_awarded">सिक्के जुड़ गए!</string>
    <string name="reward_locked_msg">इस रैंक के लिए आवश्यक अंक पूरे करें।</string>
    <string name="reward_already_claimed">यह इनाम पहले ही प्राप्त किया जा चुका है।</string>
    
    <!-- Themes -->
    <string name="theme_store_title">थीम स्टोर</string>
    <string name="theme_free">मुफ्त डिफ़ॉल्ट</string>
    <string name="theme_buy">खरीदें</string>
    <string name="theme_equip">लागू करें</string>
    <string name="theme_equipped">सक्रिय है</string>
    <string name="theme_bought_success">थीम सफलतापूर्वक खरीदी और लागू की गई!</string>
    <string name="not_enough_coins">पर्याप्त सिक्के नहीं हैं! और खेलकर कमाएं।</string>
    
    <!-- Support -->
    <string name="support_title">निर्माता का समर्थन</string>
    <string name="support_friendly_msg">Enjoying Math Battle? You can support the creator with ₹5 or ₹10. Support is completely optional.</string>
    <string name="support_scan_hint">PhonePe या किसी भी UPI ऐप से स्कैन करें</string>
    <string name="support_placeholder_hint">अपना असली QR यहाँ रखें: app/src/main/res/drawable/phonepe_qr.png</string>
    
    <!-- Settings -->
    <string name="settings_title">सेटिंग्स</string>
    <string name="music_label">बैकग्राउंड संगीत</string>
    <string name="sound_label">बटन ध्वनि प्रभाव</string>
    <string name="language_label">भाषा (Language)</string>
    <string name="lang_english">English</string>
    <string name="lang_hindi">हिन्दी (Hindi)</string>
</resources>
`,
  },

  // 26. res/values/themes.xml
  {
    path: 'app/src/main/res/values/themes.xml',
    category: 'values',
    description: 'Material theme styles for full-screen and action bar variants',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources xmlns:tools="http://schemas.android.com/tools">
    <!-- Base application theme. -->
    <style name="Theme.MathBattle" parent="Theme.MaterialComponents.DayNight.DarkActionBar">
        <item name="colorPrimary">@color/primary_blue</item>
        <item name="colorPrimaryVariant">@color/primary_blue_dark</item>
        <item name="colorOnPrimary">@color/text_white</item>
        <item name="colorSecondary">@color/accent_gold</item>
        <item name="android:windowBackground">@color/bg_dark</item>
    </style>

    <style name="Theme.MathBattle.NoActionBar" parent="Theme.MathBattle">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
    </style>

    <style name="Theme.MathBattle.NoActionBar.Fullscreen" parent="Theme.MathBattle.NoActionBar">
        <item name="android:windowFullscreen">true</item>
    </style>
</resources>
`,
  },

  // 27. Drawables
  {
    path: 'app/src/main/res/drawable/phonepe_qr_placeholder.xml',
    category: 'drawable',
    description: 'Safe vector drawable placeholder displayed when real phonepe_qr.png is not yet present',
    content: `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="260dp"
    android:height="260dp"
    android:viewportWidth="260"
    android:viewportHeight="260">
    <!-- Outer QR Frame -->
    <path
        android:fillColor="#1E293B"
        android:strokeColor="#5F259F"
        android:strokeWidth="4"
        android:pathData="M20,20 h220 v220 h-220 z" />

    <!-- Corner 1 -->
    <path
        android:fillColor="#5F259F"
        android:pathData="M35,35 h50 v50 h-50 z M45,45 h30 v30 h-30 z" />

    <!-- Corner 2 -->
    <path
        android:fillColor="#5F259F"
        android:pathData="M175,35 h50 v50 h-50 z M185,45 h30 v30 h-30 z" />

    <!-- Corner 3 -->
    <path
        android:fillColor="#5F259F"
        android:pathData="M35,175 h50 v50 h-50 z M45,185 h30 v30 h-30 z" />

    <!-- Center PhonePe Badge -->
    <path
        android:fillColor="#5F259F"
        android:pathData="M100,100 h60 v60 h-60 z" />

    <path
        android:fillColor="#FFFFFF"
        android:pathData="M125,115 h10 v30 h-10 z M120,122 h20 v8 h-20 z" />
</vector>
`,
  },
  {
    path: 'app/src/main/res/drawable/bg_option_default.xml',
    category: 'drawable',
    description: 'Default option button rounded drawable',
    content: `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <solid android:color="#1E293B" />
    <stroke android:width="2dp" android:color="#334155" />
    <corners android:radius="14dp" />
</shape>
`,
  },
  {
    path: 'app/src/main/res/drawable/bg_option_correct.xml',
    category: 'drawable',
    description: 'Green highlight drawable for correct answer',
    content: `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <solid android:color="#1B5E20" />
    <stroke android:width="2dp" android:color="#4CAF50" />
    <corners android:radius="14dp" />
</shape>
`,
  },
  {
    path: 'app/src/main/res/drawable/bg_option_wrong.xml',
    category: 'drawable',
    description: 'Red highlight drawable for wrong answer',
    content: `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <solid android:color="#B71C1C" />
    <stroke android:width="2dp" android:color="#F44336" />
    <corners android:radius="14dp" />
</shape>
`,
  },

  // 28. XML Layouts
  {
    path: 'app/src/main/res/layout/activity_splash.xml',
    category: 'layout',
    description: 'Splash screen layout with Math Battle branding and loading spinner',
    content: `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#0F172A"
    android:gravity="center">

    <LinearLayout
        android:id="@+id/ivLogo"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:orientation="vertical">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="⚔️ ➕ ✖️"
            android:textSize="54sp" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="12dp"
            android:text="MATH BATTLE"
            android:textColor="#38BDF8"
            android:textSize="32sp"
            android:textStyle="bold" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="6dp"
            android:text="Sharpen Your Mind, Conquer Math!"
            android:textColor="#94A3B8"
            android:textSize="14sp" />

        <ProgressBar
            android:layout_width="40dp"
            android:layout_height="40dp"
            android:layout_marginTop="32dp"
            android:indeterminateTint="#38BDF8" />
    </LinearLayout>
</RelativeLayout>
`,
  },
  {
    path: 'app/src/main/res/layout/activity_main.xml',
    category: 'layout',
    description: 'Main home screen layout with coin counter, rank progression bar, settings, support, and 5 main cards',
    content: `<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#0F172A"
    android:fillViewport="true">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="20dp">

        <!-- Top Header Bar -->
        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

            <!-- Coins Badge -->
            <LinearLayout
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:background="#1E293B"
                android:gravity="center_vertical"
                android:paddingHorizontal="14dp"
                android:paddingVertical="8dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="🪙 "
                    android:textSize="16sp" />

                <TextView
                    android:id="@+id/tvCoinCount"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="0"
                    android:textColor="#FFD54F"
                    android:textSize="16sp"
                    android:textStyle="bold" />
            </LinearLayout>

            <!-- Actions Right -->
            <LinearLayout
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_alignParentEnd="true"
                android:gravity="center_vertical"
                android:orientation="horizontal">

                <Button
                    android:id="@+id/btnSupport"
                    android:layout_width="wrap_content"
                    android:layout_height="36dp"
                    android:backgroundTint="#5F259F"
                    android:text="Support ₹"
                    android:textAllCaps="false"
                    android:textColor="#FFFFFF"
                    android:textSize="12sp" />

                <ImageButton
                    android:id="@+id/btnSettings"
                    android:layout_width="38dp"
                    android:layout_height="38dp"
                    android:layout_marginStart="8dp"
                    android:background="#1E293B"
                    android:contentDescription="Settings"
                    android:src="@android:drawable/ic_menu_manage" />
            </LinearLayout>
        </RelativeLayout>

        <!-- Rank Card -->
        <androidx.cardview.widget.CardView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            app:cardBackgroundColor="#1E293B"
            app:cardCornerRadius="14dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="16dp">

                <RelativeLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content">

                    <TextView
                        android:id="@+id/tvRankName"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="Bronze I"
                        android:textColor="#38BDF8"
                        android:textSize="18sp"
                        android:textStyle="bold" />

                    <TextView
                        android:id="@+id/tvCurrentPoints"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_alignParentEnd="true"
                        android:text="0 / 200 pts"
                        android:textColor="#94A3B8"
                        android:textSize="13sp" />
                </RelativeLayout>

                <ProgressBar
                    android:id="@+id/pbRankProgress"
                    style="@style/Widget.AppCompat.ProgressBar.Horizontal"
                    android:layout_width="match_parent"
                    android:layout_height="8dp"
                    android:layout_marginTop="8dp"
                    android:max="100"
                    android:progress="0"
                    android:progressTint="#38BDF8" />
            </LinearLayout>
        </androidx.cardview.widget.CardView>

        <!-- Main Card 1: Play Game -->
        <androidx.cardview.widget.CardView
            android:id="@+id/cardPlayGame"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            app:cardBackgroundColor="#2563EB"
            app:cardCornerRadius="16dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="20dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="⚔️ Play Game"
                    android:textColor="#FFFFFF"
                    android:textSize="22sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="4dp"
                    android:text="1-Min, 30s Speed Run, or Endless Mode"
                    android:textColor="#DBEAFE"
                    android:textSize="13sp" />
            </LinearLayout>
        </androidx.cardview.widget.CardView>

        <!-- Main Card 2: Rank & Rewards -->
        <androidx.cardview.widget.CardView
            android:id="@+id/cardRankRewards"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="12dp"
            app:cardBackgroundColor="#1E293B"
            app:cardCornerRadius="14dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="16dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="🏆 Rank &amp; Rewards"
                    android:textColor="#F8FAFC"
                    android:textSize="18sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="4dp"
                    android:text="30 levels: Bronze, Silver, Gold, Platinum, Diamond, Legend"
                    android:textColor="#94A3B8"
                    android:textSize="13sp" />
            </LinearLayout>
        </androidx.cardview.widget.CardView>

        <!-- Main Card 3: Theme Store -->
        <androidx.cardview.widget.CardView
            android:id="@+id/cardThemeStore"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="12dp"
            app:cardBackgroundColor="#1E293B"
            app:cardCornerRadius="14dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="16dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="🎨 Theme Store"
                    android:textColor="#F8FAFC"
                    android:textSize="18sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="4dp"
                    android:text="Ocean Blue, Neon Purple, Forest Green, Sunset Orange &amp; more"
                    android:textColor="#94A3B8"
                    android:textSize="13sp" />
            </LinearLayout>
        </androidx.cardview.widget.CardView>

        <!-- Main Card 4: About Creator -->
        <androidx.cardview.widget.CardView
            android:id="@+id/cardAboutCreator"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="12dp"
            app:cardBackgroundColor="#1E293B"
            app:cardCornerRadius="14dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="16dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="👤 About Creator"
                    android:textColor="#F8FAFC"
                    android:textSize="18sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="4dp"
                    android:text="Story of Bibek Kumar Tanti (English &amp; Hindi)"
                    android:textColor="#94A3B8"
                    android:textSize="13sp" />
            </LinearLayout>
        </androidx.cardview.widget.CardView>

        <!-- Main Card 5: Share App -->
        <androidx.cardview.widget.CardView
            android:id="@+id/cardShareApp"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="12dp"
            android:layout_marginBottom="24dp"
            app:cardBackgroundColor="#1E293B"
            app:cardCornerRadius="14dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="16dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="📲 Share App"
                    android:textColor="#F8FAFC"
                    android:textSize="18sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="4dp"
                    android:text="Share Math Battle with friends and challenge their math speed"
                    android:textColor="#94A3B8"
                    android:textSize="13sp" />
            </LinearLayout>
        </androidx.cardview.widget.CardView>

    </LinearLayout>
</ScrollView>
`,
  },
  {
    path: 'app/src/main/res/layout/activity_game_play.xml',
    category: 'layout',
    description: 'Active math game screen with score, countdown timer, question card, and 4 answer buttons',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#0F172A"
    android:orientation="vertical"
    android:padding="20dp">

    <!-- Top Gameplay HUD -->
    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="vertical">

            <TextView
                android:id="@+id/tvTimerLabel"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Time Left"
                android:textColor="#94A3B8"
                android:textSize="12sp" />

            <TextView
                android:id="@+id/tvTimerValue"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="60s"
                android:textColor="#38BDF8"
                android:textSize="26sp"
                android:textStyle="bold" />
        </LinearLayout>

        <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerHorizontal="true"
            android:gravity="center"
            android:orientation="vertical">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Questions"
                android:textColor="#94A3B8"
                android:textSize="12sp" />

            <TextView
                android:id="@+id/tvQuestionsCount"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="0"
                android:textColor="#F8FAFC"
                android:textSize="22sp"
                android:textStyle="bold" />
        </LinearLayout>

        <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentEnd="true"
            android:gravity="end"
            android:orientation="vertical">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Score"
                android:textColor="#94A3B8"
                android:textSize="12sp" />

            <TextView
                android:id="@+id/tvScoreValue"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="0"
                android:textColor="#FFD54F"
                android:textSize="26sp"
                android:textStyle="bold" />
        </LinearLayout>
    </RelativeLayout>

    <!-- Question Card -->
    <androidx.cardview.widget.CardView
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_marginVertical="24dp"
        android:layout_weight="1"
        app:cardBackgroundColor="#1E293B"
        app:cardCornerRadius="20dp">

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:padding="20dp">

            <TextView
                android:id="@+id/tvQuestionText"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_centerInParent="true"
                android:text="14 × 7 = ?"
                android:textAlignment="center"
                android:textColor="#F8FAFC"
                android:textSize="44sp"
                android:textStyle="bold" />
        </RelativeLayout>
    </androidx.cardview.widget.CardView>

    <!-- 4 Option Buttons (2x2 Grid) -->
    <GridLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:columnCount="2"
        android:rowCount="2">

        <Button
            android:id="@+id/btnOption1"
            android:layout_width="0dp"
            android:layout_height="72dp"
            android:layout_columnWeight="1"
            android:layout_margin="6dp"
            android:text="98"
            android:textColor="#FFFFFF"
            android:textSize="24sp"
            android:textStyle="bold" />

        <Button
            android:id="@+id/btnOption2"
            android:layout_width="0dp"
            android:layout_height="72dp"
            android:layout_columnWeight="1"
            android:layout_margin="6dp"
            android:text="84"
            android:textColor="#FFFFFF"
            android:textSize="24sp"
            android:textStyle="bold" />

        <Button
            android:id="@+id/btnOption3"
            android:layout_width="0dp"
            android:layout_height="72dp"
            android:layout_columnWeight="1"
            android:layout_margin="6dp"
            android:text="105"
            android:textColor="#FFFFFF"
            android:textSize="24sp"
            android:textStyle="bold" />

        <Button
            android:id="@+id/btnOption4"
            android:layout_width="0dp"
            android:layout_height="72dp"
            android:layout_columnWeight="1"
            android:layout_margin="6dp"
            android:text="91"
            android:textColor="#FFFFFF"
            android:textSize="24sp"
            android:textStyle="bold" />
    </GridLayout>

    <!-- Exit / Finish Button -->
    <Button
        android:id="@+id/btnExitGame"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:backgroundTint="#334155"
        android:text="Exit Match"
        android:textAllCaps="false"
        android:textColor="#94A3B8" />

</LinearLayout>
`,
  },
  {
    path: 'app/src/main/res/layout/activity_support.xml',
    category: 'layout',
    description: 'Support screen layout with purple PhonePe styling, centered QR image view, and clear instructions',
    content: `<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#0F172A"
    android:fillViewport="true">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="24dp">

        <Button
            android:id="@+id/btnBack"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:backgroundTint="#1E293B"
            android:text="← Back"
            android:textColor="#F8FAFC" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:text="Support the Creator"
            android:textColor="#F8FAFC"
            android:textSize="24sp"
            android:textStyle="bold" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:text="Enjoying Math Battle? You can support the creator with ₹5 or ₹10. Support is completely optional."
            android:textColor="#94A3B8"
            android:textSize="15sp"
            android:lineSpacingExtra="4dp" />

        <!-- Centered QR Container with PhonePe Purple Accent -->
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="24dp"
            android:background="#1E293B"
            android:gravity="center"
            android:orientation="vertical"
            android:padding="24dp">

            <ImageView
                android:id="@+id/ivPhonePeQR"
                android:layout_width="240dp"
                android:layout_height="240dp"
                android:contentDescription="PhonePe QR Code"
                android:scaleType="fitCenter" />

            <TextView
                android:id="@+id/tvPlaceholderInfo"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="14dp"
                android:text="Placeholder active until you place your real image at:\napp/src/main/res/drawable/phonepe_qr.png"
                android:textAlignment="center"
                android:textColor="#38BDF8"
                android:textSize="12sp" />
        </LinearLayout>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            android:text="Support directly powers Bibek's software tools and education. Thank you!"
            android:textAlignment="center"
            android:textColor="#94A3B8"
            android:textSize="13sp" />

    </LinearLayout>
</ScrollView>
`,
  },
];
