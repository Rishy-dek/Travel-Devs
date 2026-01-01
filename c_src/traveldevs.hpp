#ifndef TRAVELDEVS_HPP
#define TRAVELDEVS_HPP

#include "traveldevs.h"
#include <string>
#include <stdexcept>
#include <vector>

namespace td {

class TravelDevs {
public:
    static void init() {
        if (td_init() != 0) {
            throw std::runtime_error("Failed to initialize Travel-devs");
        }
    }

    static std::string path(td_path_type_t type) {
        const char* p = td_path(type);
        return p ? std::string(p) : "";
    }

    static std::string config(const std::string& key) {
        const char* c = td_config(key.c_str());
        return c ? std::string(c) : "";
    }

    static bool require_state(const std::string& state_signature) {
        return td_require_state(state_signature.c_str()) == 0;
    }

    static std::vector<char> load(const std::string& resource_name) {
        void* res = td_load(resource_name.c_str());
        if (!res) return {};
        
        // Prototype simplification: assume 1024 bytes for demo
        std::vector<char> data((char*)res, (char*)res + 1024);
        // In caching version, we don't call free here
        return data;
    }

    static void clear_cache() {
        td_clear_cache();
    }
};

} // namespace td

#endif // TRAVELDEVS_HPP
