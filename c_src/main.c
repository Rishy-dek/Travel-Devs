#include <stdio.h>
#include <stdlib.h>
#include "traveldevs.h"

int main() {
    printf("--- Travel-devs Prototype Demo ---\\n\\n");

    // 1. Initialize
    if (td_init() != 0) {
        fprintf(stderr, "Failed to initialize.\\n");
        return 1;
    }

    // 2. Check Paths
    printf("Assets Path: %s\\n", td_path(TD_ASSETS));
    printf("Config Path: %s\\n", td_path(TD_CONFIG));

    // 3. Check Config (simulating env var)
    setenv("TD_CFG_MODE", "production", 1);
    printf("Config 'MODE': %s\\n", td_config("MODE"));

    // 4. Require State
    if (td_require_state("linux-x64") == 0) {
        printf("Environment State: Verified (Compatible).\\n");
    } else {
        printf("Environment State: Mismatch!\\n");
    }

    // 5. Load Resources with Caching
    printf("\nLoading assets with caching:\n");
    td_load("icon.png");   // Fresh load
    td_load("icon.png");   // Cache hit
    td_load("config.json");
    td_load("vertex.vert");
    
    td_clear_cache();
    td_load("icon.png");   // Fresh load again after clear

    printf("\\n--- End of Demo ---\\n");
    return 0;
}
