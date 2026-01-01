import ctypes
import os
import platform

class TravelDevs:
    _lib = None

    @classmethod
    def _get_lib(cls):
        if cls._lib is None:
            # Determine library name based on OS
            system = platform.system()
            if system == "Windows":
                lib_name = "traveldevs.dll"
            elif system == "Darwin":
                lib_name = "libtraveldevs.dylib"
            else:
                lib_name = "./libtraveldevs.so"
            
            # In this prototype we assume the shared lib is in the current directory
            # or we link statically in the demo. For Python demo, we'll use the compiled .so/.dll
            try:
                cls._lib = ctypes.CDLL(lib_name)
            except OSError:
                # Fallback for replit environment where we might just have the object files
                # or we need to build a shared object first
                raise ImportError(f"Could not load {lib_name}. Ensure the library is compiled as a shared object.")

            cls._lib.td_init.restype = ctypes.c_int
            cls._lib.td_path.restype = ctypes.c_char_p
            cls._lib.td_path.argtypes = [ctypes.c_int]
            cls._lib.td_config.restype = ctypes.c_char_p
            cls._lib.td_config.argtypes = [ctypes.c_char_p]
            cls._lib.td_require_state.restype = ctypes.c_int
            cls._lib.td_require_state.argtypes = [ctypes.c_char_p]
            cls._lib.td_load.restype = ctypes.c_void_p
            cls._lib.td_load.argtypes = [ctypes.c_char_p]
            cls._lib.td_free_resource.argtypes = [ctypes.c_void_p]

        return cls._lib

    @staticmethod
    def init():
        if TravelDevs._get_lib().td_init() != 0:
            raise RuntimeError("Failed to initialize Travel-devs")

    @staticmethod
    def path(path_type):
        # path_type: 0=ASSETS, 1=CONFIG, 2=CACHE, 3=LOGS
        res = TravelDevs._get_lib().td_path(path_type)
        return res.decode('utf-8') if res else None

    @staticmethod
    def config(key):
        res = TravelDevs._get_lib().td_config(key.encode('utf-8'))
        return res.decode('utf-8') if res else None

    @staticmethod
    def require_state(signature):
        return TravelDevs._get_lib().td_require_state(signature.encode('utf-8')) == 0

    @staticmethod
    def load(resource_name):
        lib = TravelDevs._get_lib()
        res_ptr = lib.td_load(resource_name.encode('utf-8'))
        if not res_ptr:
            return None
        # Simulating data retrieval
        data = ctypes.string_at(res_ptr)
        lib.td_free_resource(res_ptr)
        return data.decode('utf-8', errors='ignore')
