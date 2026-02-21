import Expert from "../models/Experts.js";
/**
 * GET /experts
 * Query params: page, limit, category, search
 * Returns paginated list of experts with optional filters
 */
export const getExperts = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, category, search } = req.query;
    page = Number(page);
    limit = Number(limit);

    // Build query object
    const query = {};
    if (search) query.name = { $regex: search, $options: "i" }; 
    if (category) query.category = { $regex: category.trim(), $options: "i" };
   // case-insensitive search

    const total = await Expert.countDocuments(query); // total results
    const experts = await Expert.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    const pages = Math.ceil(total / limit);
    res.json({
      total,
      page,
      limit,
      pages,
      experts
    });
  } catch (err) {
    next(err); // Pass to global error handler
  }
};

/**
 * GET /experts/:id
 * Returns expert details by ID
 */
export const getExpertById = async (req, res, next) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      const error = new Error("Expert not found");
      error.statusCode = 404;
      throw error;
    }
    res.json(expert);
  } catch (err) {
    next(err);
  }
};