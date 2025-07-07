import React, { useState, useEffect } from "react";
import {
  Plus,
  Droplets,
  Brain,
  Sun,
  Cloud,
  CloudRain,
  Moon,
  Sparkles,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

const Blossom = () => {
  const [currentView, setCurrentView] = useState("calendar"); // 'calendar' or 'garden'
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Store data for each date
  const [dailyData, setDailyData] = useState({});

  const [showHabitModal, setShowHabitModal] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showEmojiModal, setShowEmojiModal] = useState(false);

  const moods = [
    {
      id: "sunny",
      label: "Happy",
      icon: Sun,
      color: "text-yellow-400",
      weather: "Sunny skies and warm light",
      emoji: "😊",
    },
    {
      id: "cloudy",
      label: "Tired",
      icon: Cloud,
      color: "text-gray-400",
      weather: "Gentle clouds drifting by",
      emoji: "😴",
    },
    {
      id: "rainy",
      label: "Sad",
      icon: CloudRain,
      color: "text-blue-400",
      weather: "Refreshing rain nurturing growth",
      emoji: "😢",
    },
    {
      id: "calm",
      label: "Peaceful",
      icon: Moon,
      color: "text-purple-300",
      weather: "Serene moonlit evening",
      emoji: "😌",
    },
  ];

  const habits = [
    {
      id: "meditate",
      label: "Meditate",
      icon: Brain,
      type: "tree",
      color: "bg-purple-500",
      emoji: "🧘",
    },
    {
      id: "water",
      label: "Drink Water",
      icon: Droplets,
      type: "flower",
      color: "bg-blue-500",
      emoji: "💧",
    },
    {
      id: "exercise",
      label: "Exercise",
      icon: "💪",
      type: "flower",
      color: "bg-red-500",
      emoji: "🏃",
    },
    {
      id: "read",
      label: "Read",
      icon: "📚",
      type: "tree",
      color: "bg-green-500",
      emoji: "📖",
    },
    {
      id: "sleep",
      label: "Good Sleep",
      icon: "😴",
      type: "flower",
      color: "bg-indigo-500",
      emoji: "🛌",
    },
    {
      id: "gratitude",
      label: "Gratitude",
      icon: "🙏",
      type: "tree",
      color: "bg-yellow-500",
      emoji: "✨",
    },
  ];

  const customEmojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🤗",
    "🤔",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "😐",
    "😑",
    "😬",
  ];

  const flowerTypes = [
    { color: "text-pink-400", size: "text-2xl", symbol: "🌸" },
    { color: "text-red-400", size: "text-2xl", symbol: "🌺" },
    { color: "text-yellow-400", size: "text-2xl", symbol: "🌻" },
    { color: "text-purple-400", size: "text-2xl", symbol: "🌷" },
    { color: "text-blue-400", size: "text-2xl", symbol: "💙" },
  ];

  const treeTypes = [
    { symbol: "🌳", size: "text-4xl" },
    { symbol: "🌲", size: "text-4xl" },
    { symbol: "🎋", size: "text-3xl" },
    { symbol: "🌴", size: "text-4xl" },
  ];

  // Get data for current selected date
  const getCurrentDayData = () => {
    return (
      dailyData[selectedDate] || {
        flowers: [],
        trees: [],
        mood: "sunny",
        habits: [],
        customEmojis: [],
      }
    );
  };

  // Update data for current selected date
  const updateDayData = (updates) => {
    setDailyData((prev) => ({
      ...prev,
      [selectedDate]: {
        ...getCurrentDayData(),
        ...updates,
      },
    }));
  };

  const getRandomPosition = () => ({
    left: Math.random() * 70 + 10 + "%",
    bottom: Math.random() * 30 + 10 + "%",
  });

  const addHabit = (habitId) => {
    const habit = habits.find((h) => h.id === habitId);
    const currentData = getCurrentDayData();

    const newItem = {
      id: Date.now(),
      type: habit.type,
      position: getRandomPosition(),
      timestamp: new Date().toISOString(),
      habitId,
    };

    if (habit.type === "flower") {
      const flowerType =
        flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
      newItem.appearance = flowerType;
      updateDayData({
        flowers: [...currentData.flowers, newItem],
        habits: [...currentData.habits, habitId],
      });
    } else {
      const treeType = treeTypes[Math.floor(Math.random() * treeTypes.length)];
      newItem.appearance = treeType;
      updateDayData({
        trees: [...currentData.trees, newItem],
        habits: [...currentData.habits, habitId],
      });
    }
    setShowHabitModal(false);
  };

  const setMood = (moodId) => {
    updateDayData({ mood: moodId });
    setShowMoodModal(false);
  };

  const addCustomEmoji = (emoji) => {
    const currentData = getCurrentDayData();
    updateDayData({
      customEmojis: [...currentData.customEmojis, { emoji, id: Date.now() }],
    });
    setShowEmojiModal(false);
  };

  const getWeatherEffect = (mood) => {
    switch (mood) {
      case "sunny":
        return "bg-gradient-to-b from-blue-300 via-blue-200 to-green-200";
      case "cloudy":
        return "bg-gradient-to-b from-gray-300 via-gray-200 to-green-200";
      case "rainy":
        return "bg-gradient-to-b from-gray-400 via-blue-300 to-green-300";
      case "calm":
        return "bg-gradient-to-b from-purple-400 via-purple-300 to-green-300";
      default:
        return "bg-gradient-to-b from-blue-300 via-blue-200 to-green-200";
    }
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const getDayPreview = (date) => {
    const dateStr = date.toDateString();
    const dayData = dailyData[dateStr];

    if (!dayData) return null;

    const totalHabits = dayData.habits?.length || 0;
    const mood = moods.find((m) => m.id === dayData.mood);

    return {
      totalHabits,
      mood: mood?.emoji || "😊",
      hasData: totalHabits > 0 || dayData.customEmojis?.length > 0,
    };
  };

  const currentDayData = getCurrentDayData();
  const currentMood = moods.find((m) => m.id === currentDayData.mood);
  const MoodIcon = currentMood?.icon || Sun;

  if (currentView === "calendar") {
    const days = getDaysInMonth(currentMonth);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Blossom Everyday 🌷
              </h1>
              <p className="text-gray-400">
                Track your wellness journey day by day
              </p>
            </div>
            <Calendar className="w-8 h-8 text-green-400" />
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6 bg-gray-800 rounded-xl p-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="bg-gray-800 rounded-xl p-4">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-gray-400 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={index} className="h-20"></div>;
                }

                const isToday =
                  day.toDateString() === new Date().toDateString();
                const isSelected = day.toDateString() === selectedDate;
                const preview = getDayPreview(day);

                return (
                  <button
                    key={day.toDateString()}
                    onClick={() => {
                      setSelectedDate(day.toDateString());
                      setCurrentView("garden");
                    }}
                    className={`h-20 p-2 rounded-lg border-2 transition-all hover:bg-gray-700 ${
                      isToday
                        ? "border-green-400 bg-green-400/10"
                        : isSelected
                        ? "border-blue-400 bg-blue-400/10"
                        : preview?.hasData
                        ? "border-gray-600 bg-gray-700/50"
                        : "border-gray-700"
                    }`}
                  >
                    <div className="text-sm font-semibold mb-1">
                      {day.getDate()}
                    </div>
                    {preview && (
                      <div className="flex flex-col items-center gap-1">
                        <div className="text-lg">{preview.mood}</div>
                        {preview.totalHabits > 0 && (
                          <div className="text-xs bg-green-500 text-white px-1 rounded">
                            {preview.totalHabits}
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">📅</div>
              <div className="text-sm text-gray-400">Days Tracked</div>
              <div className="text-xl font-bold text-green-400">
                {Object.keys(dailyData).length}
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">🌱</div>
              <div className="text-sm text-gray-400">Total Habits</div>
              <div className="text-xl font-bold text-blue-400">
                {Object.values(dailyData).reduce(
                  (sum, day) => sum + (day.habits?.length || 0),
                  0
                )}
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">🌸</div>
              <div className="text-sm text-gray-400">Flowers Grown</div>
              <div className="text-xl font-bold text-pink-400">
                {Object.values(dailyData).reduce(
                  (sum, day) => sum + (day.flowers?.length || 0),
                  0
                )}
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">🌳</div>
              <div className="text-sm text-gray-400">Trees Grown</div>
              <div className="text-xl font-bold text-green-400">
                {Object.values(dailyData).reduce(
                  (sum, day) => sum + (day.trees?.length || 0),
                  0
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Garden View (existing garden code with modifications)
  const Fireflies = () => {
    const totalHabits = currentDayData.habits?.length || 0;
    if (totalHabits < 5) return null;
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
            style={{
              left: Math.random() * 80 + 10 + "%",
              top: Math.random() * 60 + 20 + "%",
              animationDelay: i * 0.5 + "s",
              animationDuration: "2s",
            }}
          />
        ))}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView("calendar")}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Calendar
            </button>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">
              {new Date(selectedDate).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-400">
              {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Blossom - Wellness Journal
            </h1>
            <p className="text-gray-400">Your peaceful wellness sanctuary</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {currentDayData.habits?.length || 0}
              </div>
              <div className="text-xs text-gray-400">Today's Growth</div>
            </div>
          </div>
        </div>

        {/* Current Mood & Weather */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MoodIcon className={`w-8 h-8 ${currentMood?.color}`} />
              <div>
                <div className="font-semibold">
                  Current Mood: {currentMood?.label}
                </div>
                <div className="text-sm text-gray-400">
                  {currentMood?.weather}
                </div>
              </div>
            </div>
            {currentDayData.customEmojis?.length > 0 && (
              <div className="flex gap-2">
                {currentDayData.customEmojis.map((item) => (
                  <span key={item.id} className="text-2xl">
                    {item.emoji}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Today's Habits */}
        {currentDayData.habits?.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-4 mb-4">
            <h3 className="font-semibold mb-3">Today's Completed Habits</h3>
            <div className="flex flex-wrap gap-2">
              {currentDayData.habits.map((habitId, index) => {
                const habit = habits.find((h) => h.id === habitId);
                return (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{habit?.emoji}</span>
                    {habit?.label}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Garden View */}
      <div className="max-w-4xl mx-auto">
        <div
          className={`relative h-96 rounded-2xl overflow-hidden ${getWeatherEffect(
            currentDayData.mood
          )}`}
        >
          {/* Ground */}
          <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-green-600 to-green-400"></div>

          {/* Trees */}
          {currentDayData.trees?.map((tree) => (
            <div
              key={tree.id}
              className="absolute transform -translate-x-1/2 animate-bounce"
              style={tree.position}
            >
              <div className={tree.appearance.size}>
                {tree.appearance.symbol}
              </div>
            </div>
          ))}

          {/* Flowers */}
          {currentDayData.flowers?.map((flower) => (
            <div
              key={flower.id}
              className="absolute transform -translate-x-1/2 animate-pulse"
              style={flower.position}
            >
              <div className={flower.appearance.size}>
                {flower.appearance.symbol}
              </div>
            </div>
          ))}

          {/* Special Effects */}
          <Fireflies />

          {(currentDayData.habits?.length || 0) >= 10 && (
            <div className="absolute top-4 right-4">
              <Sparkles className="w-8 h-8 text-yellow-300 animate-spin" />
            </div>
          )}

          {/* Rain Effect */}
          {currentDayData.mood === "rainy" && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-8 bg-blue-300 opacity-60 animate-bounce"
                  style={{
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 50 + "%",
                    animationDelay: Math.random() * 2 + "s",
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-4xl mx-auto mt-6 flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => setShowHabitModal(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Habit
        </button>
        <button
          onClick={() => setShowMoodModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          <MoodIcon className="w-5 h-5" />
          Update Mood
        </button>
        <button
          onClick={() => setShowEmojiModal(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          <span className="text-lg">😊</span>
          Add Emoji
        </button>
      </div>

      {/* Habit Modal */}
      {showHabitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-center">
              Complete a Habit
            </h3>
            <div className="space-y-3">
              {habits.map((habit) => {
                const Icon = habit.icon;
                const isCompleted = currentDayData.habits?.includes(habit.id);
                return (
                  <button
                    key={habit.id}
                    onClick={() => !isCompleted && addHabit(habit.id)}
                    disabled={isCompleted}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-opacity ${
                      isCompleted
                        ? "bg-gray-600 opacity-50 cursor-not-allowed"
                        : `${habit.color} hover:opacity-80`
                    }`}
                  >
                    <span className="text-2xl">{habit.emoji}</span>
                    <span className="font-semibold text-white">
                      {habit.label}
                    </span>
                    <span className="ml-auto text-white text-sm">
                      {isCompleted
                        ? "✅"
                        : `+${habit.type === "flower" ? "🌸" : "🌳"}`}
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setShowHabitModal(false)}
              className="w-full mt-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Mood Modal */}
      {showMoodModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center">
              How are you feeling?
            </h3>
            <div className="space-y-3">
              {moods.map((mood) => {
                const Icon = mood.icon;
                return (
                  <button
                    key={mood.id}
                    onClick={() => setMood(mood.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors ${
                      currentDayData.mood === mood.id
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${mood.color}`} />
                    <span className="text-2xl">{mood.emoji}</span>
                    <div className="text-left">
                      <div className="font-semibold">{mood.label}</div>
                      <div className="text-sm text-gray-400">
                        {mood.weather}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setShowMoodModal(false)}
              className="w-full mt-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Emoji Modal */}
      {showEmojiModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-center">Add an Emoji</h3>
            <div className="grid grid-cols-8 gap-2">
              {customEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => addCustomEmoji(emoji)}
                  className="text-2xl p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowEmojiModal(false)}
              className="w-full mt-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blossom;
