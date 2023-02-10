"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const fakeData_json_1 = require("../fakeData.json");
exports.resolvers = {
    Query: {
        getAllDAOGroups: (parent, args) => {
            const { daoId } = args;
            return fakeData_json_1.daoGroups.map((group) => (Object.assign(Object.assign({}, group), { members: fakeData_json_1.daoMembers.filter((member) => member.daos.includes(group.address)) })));
        },
        getMembershipInfo: (parent, args) => {
            const { daoId, groupIds } = args;
            const members = fakeData_json_1.daoMembers.filter((member) => member.daos.some((groupId) => groupIds.includes(groupId)));
            return {
                members: members.length,
                approveds: members.filter(({ status }) => status === "approved")
                    .length,
                pendings: members.filter(({ status }) => status === "pending")
                    .length,
                rejecteds: members.filter(({ status }) => status === "rejected")
                    .length,
                dayChanges: 2.45,
            };
        },
        getAnnouncements: (parent, args) => {
            const { daoId, groupIds, filterBy, limit } = args;
            return fakeData_json_1.announcements
                .filter((announcement) => groupIds.includes(announcement.groupId))
                .sort((a, b) => {
                switch (filterBy) {
                    case "newest":
                    default:
                        return new Date(a.createdAt).getTime() <
                            new Date(b.createdAt).getTime()
                            ? 1
                            : -1;
                    case "trending":
                        return new Date(a.updatedAt).getTime() <
                            new Date(b.updatedAt).getTime()
                            ? 1
                            : -1;
                    case "most_activity":
                        return a.replies < b.replies ? 1 : -1;
                }
            })
                .slice(0, limit)
                .map((item) => {
                var _a;
                return (Object.assign(Object.assign({}, item), { announcerAddress: item.announcer, announcerAvatar: (_a = fakeData_json_1.daoMembers.find((member) => member.address === item.announcer)) === null || _a === void 0 ? void 0 : _a.avatar }));
            });
        },
        getProposals: (parent, args) => {
            const { daoId, groupIds } = args;
            return fakeData_json_1.proposals.filter((proposal) => groupIds.includes(proposal.groupId));
        },
        getVotes: (parent, args) => {
            const { daoId, groupIds } = args;
            return fakeData_json_1.votes.filter((vote) => groupIds.includes(vote.groupId));
        },
        getTransactions: (parent, args) => {
            const { daoId, groupIds } = args;
            return fakeData_json_1.transactions.filter((transaction) => groupIds.includes(transaction.groupId));
        },
        getClaimStatus: (parent, args) => {
            const { daoId, groupIds } = args;
            return {
                approveds: 1124,
                pendings: 224,
                rejecteds: 14,
                disputeds: 12,
                remainings: 1,
            };
        },
        getOutcomeContractStatus: (parent, args) => {
            const { daoId, groupIds } = args;
            return {
                actives: 1124,
                completeds: 224,
                totalPayments: "1298",
                awardedPayments: "987",
            };
        },
        getTreasuryPools: (parent, args) => {
            const { daoId } = args;
            return {
                totalVolumeUSD: "230750",
                dayChanges: 0.14,
                assets: [
                    {
                        name: "ixo",
                        logoUrl: "https://raw.githubusercontent.com/ixofoundation/ixo-webclient/impact/src/assets/tokens/ixo.svg",
                    },
                    {
                        name: "xusd",
                        logoUrl: "https://raw.githubusercontent.com/ixofoundation/ixo-webclient/impact/src/assets/tokens/xusd.svg",
                    },
                    {
                        name: "osmo",
                        logoUrl: "https://raw.githubusercontent.com/ixofoundation/ixo-webclient/impact/src/assets/tokens/osmo.svg",
                    },
                ],
            };
        },
        getMembers: (parent, args) => {
            const { daoId, groupId, status, keyword, sortBy, order } = args;
            return fakeData_json_1.daoMembers
                .filter((member) => member.daos.includes(groupId) &&
                (!status || member.status === status) &&
                (!keyword || member.address === keyword))
                .sort((a, b) => {
                var _a, _b;
                switch (sortBy) {
                    case "name":
                    default:
                        if (order === "desc")
                            return (_a = b.name) === null || _a === void 0 ? void 0 : _a.localeCompare(a.name);
                        return (_b = a.name) === null || _b === void 0 ? void 0 : _b.localeCompare(b.name);
                    case "votingPower":
                        if (order === "desc")
                            return b.votingPower - a.votingPower;
                        return a.votingPower - b.votingPower;
                    case "staking":
                        if (order === "desc")
                            return b.staking - a.staking;
                        return a.staking - b.staking;
                    case "votes":
                        if (order === "desc")
                            return b.votes - a.votes;
                        return a.votes - b.votes;
                    case "proposals":
                        if (order === "desc")
                            return b.proposals - a.proposals;
                        return a.proposals - b.proposals;
                }
            });
        },
        getMember: (parent, args) => {
            const { address } = args;
            return fakeData_json_1.daoMembers.find((member) => member.address === address);
        },
        getMemberProfile: (parent, args) => {
            const { address } = args;
            return fakeData_json_1.profiles.find((profile) => profile.address === address);
        },
    },
};
