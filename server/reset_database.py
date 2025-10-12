import asyncio
from app.database import engine, Base
from app.models.user import User

async def reset_database():
    print("🔄 Resetting database...")
    
    # Drop all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        print("✅ Tables dropped")
    
    # Create all tables with new schema
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        print("✅ Tables created with latest schema")
    
    print("🎉 Database reset complete!")

if __name__ == "__main__":
    asyncio.run(reset_database())