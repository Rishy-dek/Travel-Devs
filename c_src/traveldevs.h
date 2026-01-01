#ifndef TRAVELDEVS_H
#define TRAVELDEVS_H

#ifdef __cplusplus
extern "C" {
#endif

typedef enum {
    TD_ASSETS,
    TD_CONFIG,
    TD_CACHE,
    TD_LOGS
} td_path_type_t;

// Initialize the library. Returns 0 on success.
int td_init(void);

// Get a path for a specific type (assets, config, etc.)
// Returns a statically allocated string (do not free).
const char* td_path(td_path_type_t type);

// Get a configuration value by key.
// Returns NULL if not found.
const char* td_config(const char* key);

// Ensure the environment matches the required state string.
// Returns 0 if state matches, -1 otherwise.
int td_require_state(const char* state_signature);

// Load a resource (simulated). Returns a pointer to data or NULL.
void* td_load(const char* resource_name);

// Clear the memory cache of loaded resources.
void td_clear_cache(void);

// Free a loaded resource (if not cached).
void td_free_resource(void* res);

#ifdef __cplusplus
}
#endif

#endif // TRAVELDEVS_H
