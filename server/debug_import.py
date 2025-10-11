import sys
import os

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

print("Python path:")
for path in sys.path:
    print(f"  {path}")

print("\nChecking ALL imports after path fixes...")

modules_to_check = [
    "app.config.settings",
    "app.database.engine",
    "app.models.user.User",
    "app.core.security.verify_password",
    "app.schemas.user.UserCreate",
    "app.services.auth_service.AuthService",
    "app.api.v1.endpoints.auth.router"
]

for module_path in modules_to_check:
    try:
        # Convert path to import statement
        if "." in module_path:
            parts = module_path.split(".")
            import_stmt = "from " + ".".join(parts[:-1]) + " import " + parts[-1]
            exec(import_stmt)
        else:
            __import__(module_path)
        print(f"✅ {module_path}")
    except ImportError as e:
        print(f"❌ {module_path} failed: {e}")
    except Exception as e:
        print(f"❌ {module_path} failed with error: {e}")

print("\nAll imports checked!")