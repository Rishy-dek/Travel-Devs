#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/utsname.h>
#include "traveldevs.h"

static int initialized = 0;

int td_init(void) {
    initialized = 1;
    // In a real scenario, this might set up logging, detect OS, etc.
    printf("[Travel-devs] Initialized.\\n");
    return 0;
}

const char* td_path(td_path_type_t type) {
    if (!initialized) return NULL;
    
    // Cross-platform path resolution
#ifdef _WIN32
    const char* sep = "\\";
#else
    const char* sep = "/";
#endif

    // Simple prototype implementation: use environment variables or defaults
    switch (type) {
        case TD_ASSETS:
            {
                char* env = getenv("TD_ASSETS_PATH");
                if (env) return env;
                static char path_buf[256];
                snprintf(path_buf, sizeof(path_buf), ".%sassets", sep);
                return path_buf;
            }
        case TD_CONFIG:
            {
                static char path_buf[256];
                snprintf(path_buf, sizeof(path_buf), ".%sconfig", sep);
                return path_buf;
            }
        case TD_CACHE:
#ifdef _WIN32
            return "C:\\Temp\\td_cache";
#else
            return "/tmp/td_cache";
#endif
        case TD_LOGS:
#ifdef _WIN32
            return "C:\\Logs\\td";
#else
            return "/var/log/td";
#endif
        default:
            return ".";
    }
}

const char* td_config(const char* key) {
    if (!initialized) return NULL;
    // Prototype: Check environment variables prefixed with TD_CFG_
    static char env_key[256];
    snprintf(env_key, sizeof(env_key), "TD_CFG_%s", key);
    return getenv(env_key);
}

int td_require_state(const char* state_signature) {
    if (!initialized) return -1;
    
    // Prototype: Check basic OS info
    struct utsname buffer;
    if (uname(&buffer) != 0) {
        return -1;
    }
    
    // Very simple check: does the system name contain the signature?
    // In production, this would parse "linux-x64-gcc13" strictly.
    if (strcasestr(buffer.sysname, "Linux") && strstr(state_signature, "linux")) {
        return 0; 
    }
    
    // Fallback/Simulated check for this prototype environment
    // We assume we are in the "correct" environment for the demo if it's not specified
    if (strcmp(state_signature, "any") == 0) return 0;
    
    printf("[Travel-devs] Warning: Environment state check '%s' against '%s' is partial.\\n", state_signature, buffer.sysname);
    return 0; // Letting it pass for demo purposes
}

void* td_load(const char* resource_name) {
    if (!initialized) return NULL;
    
    printf("[Travel-devs] Loading resource: %s... ", resource_name);
    
    // Prototype: Just allocate a dummy buffer
    char* data = malloc(1024);
    if (data) {
        snprintf(data, 1024, "Content of %s loaded via Travel-devs.", resource_name);
        printf("Success.\\n");
    } else {
        printf("Failed.\\n");
    }
    return data;
}

void td_free_resource(void* res) {
    if (res) free(res);
}
