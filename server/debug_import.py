try:
    from app.api.v1.endpoints.auth.profile import router
    print("✅ Profile module imported successfully!")
except ImportError as e:
    print(f"❌ Import failed: {e}")
    print("Please check if the file exists at: app/api/v1/endpoints/auth/profile.py")