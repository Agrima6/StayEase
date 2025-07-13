// get /api/use/

export const getUserData = async (req, res)=>{
    try{
       const role = req.user.role;
       const recentSearchedCities = req.user.recentSearchedCities;
       res.json({success: true, role, recentSearchedCities})
    } catch(error){
        res.json({success: false, message: error.message})

    }
}

// Store user recent searched cities

// POST /api/user/store-recent-search
export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchedCity } = req.body; // ✅ singular, not plural
    const user = req.user; // ✅ no await needed

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Remove duplicate if it exists
    user.recentSearchedCities = user.recentSearchedCities.filter(
      (city) => city.toLowerCase() !== recentSearchedCity.toLowerCase()
    );

    // Add the new city at the end
    user.recentSearchedCities.push(recentSearchedCity);

    // Limit to 3 recent cities
    if (user.recentSearchedCities.length > 3) {
      user.recentSearchedCities.shift(); // Remove oldest
    }

    await user.save();

    res.json({ success: true, message: "Recent searched cities updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
