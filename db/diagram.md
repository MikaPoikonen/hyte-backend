```mermaid
erDiagram
    USERS ||--o{ DAILYHEALTHSTATS : logs

    USERS {
        int user_id PK
        varchar username
        varchar password
        varchar email
        datetime created_at
        varchar user_level
    }

    DAILYHEALTHSTATS {
        int stat_id PK
        int user_id FK
        int calories_eaten
        int calories_used
        int steps
        decimal weight_today
        datetime created_at
    }
```
