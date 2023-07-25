export const activeWorkSpace = (payload, managerDB) => {
  if (managerDB) {
    return managerDB;
  } else {
    let updatedValues = payload?.find((workspace) => workspace?.currentWorkSpaceStatus);
    return "cxc_" + updatedValues?._id + "_" + updatedValues?.tenantId;
  }
};
