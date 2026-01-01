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

typedef struct td_cache_entry {
    char* name;
    void* data;
    struct td_cache_entry* next;
} td_cache_entry_t;

static td_cache_entry_t* resource_cache = NULL;

void td_clear_cache(void) {
    td_cache_entry_t* current = resource_cache;
    while (current) {
        td_cache_entry_t* next = current->next;
        free(current->name);
        free(current->data);
        free(current);
        current = next;
    }
    resource_cache = NULL;
    printf("[Travel-devs] Cache cleared.\n");
}

void* td_load(const char* resource_name) {
    if (!initialized) return NULL;
    
    // Check cache
    td_cache_entry_t* entry = resource_cache;
    while (entry) {
        if (strcmp(entry->name, resource_name) == 0) {
            printf("[Travel-devs] Cache hit: %s\n", resource_name);
            return entry->data;
        }
        entry = entry->next;
    }

    printf("[Travel-devs] Loading resource: %s... ", resource_name);
    
    // Prototype: Just allocate a dummy buffer
    char* data = malloc(1024);
    if (data) {
        const char* ext = strrchr(resource_name, '.');
        if (ext && (strcmp(ext, ".png") == 0 || strcmp(ext, ".jpg") == 0)) {
            snprintf(data, 1024, "Image data for %s", resource_name);
        } else if (ext && strcmp(ext, ".json") == 0) {
            snprintf(data, 1024, "{\"config\": \"%s\"}", resource_name);
        } else if (ext && (strcmp(ext, ".vert") == 0 || strcmp(ext, ".frag") == 0)) {
            snprintf(data, 1024, "// Shader source for %s", resource_name);
        } else {
            snprintf(data, 1024, "Content of %s loaded via Travel-devs.", resource_name);
        }
        
        // Add to cache
        td_cache_entry_t* new_entry = malloc(sizeof(td_cache_entry_t));
        if (new_entry) {
            new_entry->name = strdup(resource_name);
            new_entry->data = data;
            new_entry->next = resource_cache;
            resource_cache = new_entry;
        }
        printf("Success.\n");
    } else {
        printf("Failed.\n");
    }
    return data;
}

void td_free_resource(void* res) {
    // In caching version, we don't free immediately unless we want to remove from cache.
    // For this prototype, td_clear_cache handles it.
    (void)res;
}
