# Exercise: Un-Pattern This

Exercise code for the lesson **Exercise: Un-Pattern This** in the course *Design Patterns, Demystified* on [ask-codey.com](https://www.ask-codey.com).

## The ticket

> **From:** the owner, Summit Gym
>
> 1. **Summit Gym North opens next month.** The same system has to keep both gyms' daily schedules, side by side: `new Gym("Downtown")` and `new Gym("North")`, each with its own classes.
> 2. **The instructors' app wants each instructor's own day.** It calls `gym.scheduleFor("Omar")` and expects Omar's classes, in order, written the same way as the full schedule.
>
> **From:** the team lead
>
> The schedule code was "made flexible" by a teammate before they moved teams: every comment says something "can be added later", and nothing ever was. Before you add anything, take out whatever isn't earning its keep, so the next person can read it. The day's schedule must look exactly the same afterward.

`scheduleFor` is already there, because the instructors' app calls it, but it gives back nothing yet.

## Pick your language

The same exercise is here in five languages. Work in the folder for the language you set up; you only need one.

| Folder | The schedule's code | The tests |
|---|---|---|
| `csharp/` | `UnPatternThis/Schedule.cs` | `UnPatternThis.Tests/ScheduleTests.cs` |
| `java/` | `src/main/java/` (`Gym.java` and the classes it uses) | `src/test/java/ScheduleTest.java` |
| `python/` | `schedule.py` | `test_schedule.py` |
| `javascript/` | `schedule.js` | `schedule.test.js` |
| `typescript/` | `schedule.ts` | `schedule.test.ts` |

The names follow each language's style: `ScheduleFor` and `AddClass` in C#, `schedule_for` and `add_class` in Python, and `scheduleFor` and `addClass` in Java, JavaScript and TypeScript.

Every folder also has a small demo program that prints both gyms' schedules for the day. You don't need to change the tests or the demo. You may delete files from the schedule's code; the tests only use `Gym` and `GymClass`.

## Run it and check your work

Open your language's folder in VS Code (**File > Open Folder**), then open its terminal (**Terminal > New Terminal**) and run these commands there.

**C#**

```bash
dotnet run --project UnPatternThis
dotnet test
```

**Java** (the Maven Wrapper downloads Maven the first time, so the first run takes a minute)

```bash
java src/main/java/Demo.java
./mvnw test
```

On Windows in PowerShell, write `.\mvnw test` instead of `./mvnw test`.

**Python** (once: make a virtual environment and install pytest into it)

```bash
python -m venv .venv
```

Then turn it on: `.venv\Scripts\Activate.ps1` in PowerShell on Windows, or `source .venv/bin/activate` on macOS (where the command is `python3`, not `python`). Then:

```bash
pip install -r requirements.txt
python demo.py
python -m pytest
```

**JavaScript**

```bash
node demo.js
npm test
```

**TypeScript** (once: `npm install`, which installs TypeScript)

```bash
node demo.ts
npm test
```

At first, 3 tests pass and 2 fail. The 3 that pass are what the schedule does today: keep them green the whole time, and run the tests after every small change. The 2 that fail are the ticket. A failing test's message starts with **Not yet:** (or **Keep this working:** if you broke something that worked) and says what it expected.

## When you're done

All 5 tests are green, the schedule's code is short enough to read in one go, and the demo prints:

```text
Downtown: 7:00 Yoga with Priya, Studio A; 12:00 Spin with Omar, Bike room
North: 18:00 HIIT with Omar, Main floor
Omar at Downtown: 12:00 Spin with Omar, Bike room
```

<details>
<summary>Stuck?</summary>

The code has three patterns that don't earn their keep. For each, ask what change it makes easy, and whether that change is happening (*Pattern Fever*):

- **`ScheduleRegistry`** is a **Singleton**: one shared list for the whole app. That's exactly what stops two gyms, and `Gym`'s constructor clears it, so the second gym wipes the first one's classes. Give each `Gym` its own list.
- **`FormatterFactoryProvider` and `FormatterFactory`** are a factory for a factory, and the factory always makes the same `LineFormatter`. Build the line in one small function (or method) instead.
- **`ByStartTime`** is a **Strategy** with one choice. Sort by start time where the schedule is made.

Take them out one at a time, running the tests after each step (*Refactoring Toward a Pattern*, run the other way). Then `scheduleFor` is a filter and a sort, a few lines long.

</details>

## Hand it in

When it works, push your solution to a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. The lesson page shows the Git commands, step by step.
