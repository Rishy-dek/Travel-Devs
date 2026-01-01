#include "traveldevs.hpp"
#include <iostream>

int main() {
    try {
        td::TravelDevs::init();
        std::cout << "C++ Assets Path: " << td::TravelDevs::path(TD_ASSETS) << std::endl;
        
        if (td::TravelDevs::require_state("linux")) {
            std::cout << "C++ State Check: OK" << std::endl;
        }
        
        auto data = td::TravelDevs::load("cpp_config.json");
        std::cout << "C++ Loaded data size: " << data.size() << std::endl;
        
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }
    return 0;
}
