#  Real-Time Coding Arena

A **real-time multiplayer coding platform** where developers compete in **coding duels and tournaments** to solve programming challenges.

The platform turns coding practice into a **gamified competitive experience**, allowing players to improve their skills through **live coding battles, matchmaking, and tournaments**.

---

#  Features

###  Real-Time Coding Duels

Two players compete to solve the same coding problem.

* Live opponent progress updates
* Instant submission results
* Real-time match events via WebSockets

---

###  Tournament System

Beyond duels, the platform supports **multi-player tournaments**.

Possible tournament formats:

* Single elimination
* Double elimination
* Bracket tournaments
* Leaderboard based competitions

---

###  Redis-Powered Matchmaking

Players enter a **matchmaking queue**.

When two players are available:

1. A match is created
2. Both players receive a `match_found` event
3. The duel begins

---

###  Real-Time WebSocket Communication

Events sent during matches:

* `match_found`
* `opponent_progress`
* `opponent_submitted`
* `match_resume`
* `match_end`

This ensures **instant updates during matches**.

---

### Reconnection Support

If a player disconnects:

```
disconnect:{user_id}
TTL = 60 seconds
```

If the player reconnects within 60 seconds:

* Match resumes
* Game state is restored

If not, the match automatically ends.

---

#  Tech Stack

## Backend

* **FastAPI** — async Python web framework
* **WebSockets** — real-time communication
* **Redis** — matchmaking, pub/sub, and temporary state
* **PostgreSQL** — persistent database
* **Async SQLAlchemy** — ORM
* **JWT Authentication** — cookie-based auth

## Frontend

* **Next.js**
* **Tailwind.css**
* **Redis**
* **TanStack** for server state management
* **Zustand** for client state management

## Infrastructure

* **Docker**
* **Docker Compose**

---

# 🏗 System Architecture

### WebSocket Layer

```
Client
   │
WebSocket
   │
FastAPI
   │
Connection Manager
   │
Redis Pub/Sub
```

The connection manager maps:

```
user_id -> websocket connection
```

---

### Match Data (Redis)

Match state is stored in Redis:

```
match:{match_id}
    player1
    player2
    player1_submitted
    player2_submitted
    status
```

User-to-match mapping:

```
user:match:{user_id} -> match_id
```

---

### Match Event Flow

```
Match Service
      ↓
Redis Pub/Sub
      ↓
Match Listener
      ↓
WebSocket
      ↓
Client
```

This allows **low-latency match updates**.

---

#  Running with Docker

The entire platform can be started using **Docker Compose**.

### 1️ Clone the repository

```
git clone https://github.com/yourusername/coding-arena.git
cd coding-arena
```

---

### 2️ Start the platform

```
docker compose up --build
```

This will start:

* FastAPI server
* Redis
* PostgreSQL
* Other required services

---

### 3️ Access the application

Backend API:

```
http://localhost:8000
```

---

# 📂 Project Structure

```
backend/
│
├── app/
│   ├── api/
│   ├── websocket/
│   ├── matchmaking/
│   ├── match/
│   ├── redis/
│   ├── services/
│   └── main.py
│
├── workers/
├── docker/
└── tests/
```

---

#  WebSocket Events

### Client → Server

```
join_queue
submit_code
progress_update
```

### Server → Client

```
match_found
opponent_progress
opponent_submitted
match_resume
match_end
```

---

#  Future Features

*  ELO rating system
*  Global leaderboard
*  AI coding opponents
*  Match replay system
*  Spectator mode
*  Smart matchmaking
*  Full tournament brackets

---

#  Vision

The goal of this project is to build a **competitive coding ecosystem** where developers can **learn algorithms, practice problem solving, and compete in real-time coding battles and tournaments**.
