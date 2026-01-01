from traveldevs import TravelDevs
import os

def run_demo():
    print("--- Travel-devs Python Binding Demo ---")
    try:
        # Set dummy env for config test
        os.environ["TD_CFG_APP_NAME"] = "TravelDevsPython"
        
        TravelDevs.init()
        
        print(f"Python Assets Path: {TravelDevs.path(0)}")
        print(f"Python Config 'APP_NAME': {TravelDevs.config('APP_NAME')}")
        
        if TravelDevs.require_state("linux"):
            print("Python Environment: Verified")
            
        print("\nPython Caching Demo:")
        print(f"Load 1: {TravelDevs.load('logo.png')}")
        print(f"Load 2 (Cache): {TravelDevs.load('logo.png')}")
        print(f"Load JSON: {TravelDevs.load('settings.json')}")
        print(f"Load Shader: {TravelDevs.load('basic.vert')}")
        
        TravelDevs.clear_cache()
        print(f"Load after clear: {TravelDevs.load('logo.png')}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    run_demo()
