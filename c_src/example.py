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
            
        content = TravelDevs.load("script.py")
        print(f"Python Loaded Content: {content}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    run_demo()
