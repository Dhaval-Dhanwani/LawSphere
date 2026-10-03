import { Lawfirm } from "../../modelsSchema/lawfirm/lawfirmSchema.js";
import { Lawyer } from "../../modelsSchema/lawyer/lawyerSchema.js";
import { Client } from "../../modelsSchema/client/clientScehma.js";

export let Authicate = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ error: "Email, password, and role are required" });
        }

        const cleanEmail = email.trim();
        const cleanPassword = password.trim();
        const normalizedRole = role.trim().toLowerCase();
        const emailFilter = { $regex: new RegExp(`^${cleanEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') };

        // Helper to check user password match
        const isMatch = (user) => {
            return user && (user.password === cleanPassword || user.password === password);
        };

        let authenticatedUser = null;
        let authenticatedRole = null;

        // 1. First, check selected role
        if (normalizedRole === "clients" || normalizedRole === "client") {
            const client = await Client.findOne({ email: emailFilter }).lean();
            if (isMatch(client)) {
                authenticatedUser = client;
                authenticatedRole = "Clients";
            }
        } else if (normalizedRole === "lawyer" || normalizedRole === "lawyers") {
            const lawyer = await Lawyer.findOne({ email: emailFilter }).lean();
            if (isMatch(lawyer)) {
                authenticatedUser = lawyer;
                authenticatedRole = "Lawyer";
            }
        } else if (normalizedRole === "lawfirm" || normalizedRole === "lawfirms" || normalizedRole === "law firm") {
            const lawfirm = await Lawfirm.findOne({
                $or: [
                    { contactEmail: emailFilter },
                    { email: emailFilter }
                ]
            }).lean();
            if (isMatch(lawfirm)) {
                authenticatedUser = lawfirm;
                authenticatedRole = "Lawfirm";
            }
        }

        // 2. Fallback: If not found in selected role, check other roles
        if (!authenticatedUser) {
            const client = await Client.findOne({ email: emailFilter }).lean();
            if (isMatch(client)) {
                authenticatedUser = client;
                authenticatedRole = "Clients";
            } else {
                const lawyer = await Lawyer.findOne({ email: emailFilter }).lean();
                if (isMatch(lawyer)) {
                    authenticatedUser = lawyer;
                    authenticatedRole = "Lawyer";
                } else {
                    const lawfirm = await Lawfirm.findOne({
                        $or: [
                            { contactEmail: emailFilter },
                            { email: emailFilter }
                        ]
                    }).lean();
                    if (isMatch(lawfirm)) {
                        authenticatedUser = lawfirm;
                        authenticatedRole = "Lawfirm";
                    }
                }
            }
        }

        if (authenticatedUser && authenticatedRole) {
            setsession(req, authenticatedUser, authenticatedRole);
            const userObj = { ...authenticatedUser };
            delete userObj.password;

            if (req.session) {
                return req.session.save((err) => {
                    if (err) console.error("Session save error:", err);
                    return res.status(200).json({
                        message: "Authentication successful",
                        role: authenticatedRole,
                        user: userObj
                    });
                });
            }

            return res.status(200).json({
                message: "Authentication successful",
                role: authenticatedRole,
                user: userObj
            });
        }

        return res.status(401).json({ error: "Invalid email or password" });
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export function setsession(req, item, role) {
    if (!req.session) return;
    req.session.user = {
        id: item._id ? item._id.toString() : item._id,
        role: role
    };
}

export let getCurrentUser = (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ error: "No active session" });
    }
    return res.status(200).json({ user: req.session.user });
};

export let SignOut = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to sign out" });
            }
            res.clearCookie('connect.sid');
            return res.status(200).json({ message: "Signed out successfully" });
        });
    } else {
        return res.status(200).json({ message: "Signed out successfully" });
    }
};