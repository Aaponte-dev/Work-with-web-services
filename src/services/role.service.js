import Role from "../models/Role";

async function serviceCreateRole(objectRole) {
    return await Role.create(objectRole);
}

async function serviceGetAllRoles() {
    return await Role.find({
        deleted: false
    });
}

async function serviceGetRoleById(roleId) {
    return await Role.findOne({
        _id: roleId,
        deleted: false
    });
}

async function serviceUpdateRoleById(roleId, objectRole) {
    return await Role.findByIdAndUpdate(roleId, objectRole, {new: true});
}

async function serviceDeleteRoleById(roleId) {
    const role = await Role.findOne({
        _id: roleId,
        deleted: false
    });

    if (role) {
        role.delete();
    }

    return false;
}

export {
    serviceCreateRole,
    serviceGetAllRoles,
    serviceGetRoleById,
    serviceUpdateRoleById,
    serviceDeleteRoleById
};