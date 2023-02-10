const {
  daoGroups,
  daoMembers,
  announcements,
  proposals,
  votes,
  transactions,
  profiles,
} = require("../fakeData.json");

const resolvers = {
  Query: {
    getAllDAOGroups: () => {
      return daoGroups.map((group) => ({
        ...group,
        members: daoMembers.filter((member) =>
          member.daos.includes(group.address)
        ),
      }));
    },
    getMembershipInfo: (parent, args) => {
      const { groupId } = args;
      const group = daoGroups.find((group) => group.address === groupId);
      const members = daoMembers.filter((member) =>
        member.daos.includes(group?.address)
      );

      return {
        members: members.length,
        approveds: members.filter(({ status }) => status === "approved").length,
        pendings: members.filter(({ status }) => status === "pending").length,
        rejecteds: members.filter(({ status }) => status === "rejected").length,
        dayChanges: 2.45,
      };
    },
    getAnnouncements: (parent, args) => {
      const { groupId, sortBy } = args;
      return announcements.filter((announcement) =>
        announcement?.daos.includes(groupId)
      );
    },
    getProposals: (parent, args) => {
      const { groupId } = args;
      return proposals.filter((proposal) => proposal?.daos.includes(groupId));
    },
    getVotes: (parent, args) => {
      const { groupId } = args;
      return votes.filter((vote) => vote?.daos.includes(groupId));
    },
    getTransactions: (parent, args) => {
      const { groupId } = args;
      return transactions.filter((transaction) =>
        transaction?.daos.includes(groupId)
      );
    },
    getClaimStatus: (parent, args) => {
      const { groupId } = args;
      return {
        approveds: 1124,
        pendings: 224,
        rejecteds: 14,
        disputeds: 12,
        remainings: 1,
      };
    },
    getOutcomeContractStatus: (parent, args) => {
      const { groupId } = args;
      return {
        actives: 1124,
        completeds: 224,
        totalPayments: "1298",
        awardedPayments: "987",
      };
    },
    getTreasuryPools: (parent, args) => {
      const { groupId } = args;
      return {
        totalVolumeUSD: "230750",
        dayChanges: 0.14,
        assets: [
          {
            name: "ixo",
            logoUrl:
              "https://raw.githubusercontent.com/ixofoundation/ixo-webclient/impact/src/assets/tokens/ixo.svg",
          },
          {
            name: "xusd",
            logoUrl:
              "https://raw.githubusercontent.com/ixofoundation/ixo-webclient/impact/src/assets/tokens/xusd.svg",
          },
          {
            name: "osmo",
            logoUrl:
              "https://raw.githubusercontent.com/ixofoundation/ixo-webclient/impact/src/assets/tokens/osmo.svg",
          },
        ],
      };
    },
    getMembers: (parent, args) => {
      const { groupId, status, keyword, sortBy, order } = args;
      return daoMembers
        .filter(
          (member) =>
            member.daos.includes(groupId) &&
            (!status || member.status === status) &&
            (!keyword || member.address === keyword)
        )
        .sort((a, b) => {
          switch (sortBy) {
            case "name":
            default:
              if (order === "desc") return b.name?.localeCompare(a.name);
              return a.name?.localeCompare(b.name);
            case "votingPower":
              if (order === "desc") return b.votingPower - a.votingPower;
              return a.votingPower - b.votingPower;
            case "staking":
              if (order === "desc") return b.staking - a.staking;
              return a.staking - b.staking;
            case "votes":
              if (order === "desc") return b.votes - a.votes;
              return a.votes - b.votes;
            case "proposals":
              if (order === "desc") return b.proposals - a.proposals;
              return a.proposals - b.proposals;
          }
        });
    },
    getMember: (parent, args) => {
      const { address } = args;
      return daoMembers.find((member) => member.address === address);
    },
    getMemberProfile: (parent, args) => {
      const { address } = args;
      return profiles.find((profile) => profile.address === address);
    },
  },
};

module.exports = { resolvers };
