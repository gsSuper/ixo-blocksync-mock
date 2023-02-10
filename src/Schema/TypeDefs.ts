import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type DAOMember {
    avatar: String
    name: String
    address: String!
    role: String
    votingPower: Float!
    staking: Int!
    votes: Int!
    proposals: Int!
    status: String!
    verified: Boolean
    administrator: Boolean
    assignedAuthority: Float
    daos: [String]
    projects: [String]
    investments: [String]
    assets: [String]
  }
  type DAOGroup {
    address: String!
    type: String!
    title: String
    # description: String
    members: [DAOMember]
  }
  type DAOGroupMembership {
    members: Int
    approveds: Int
    pendings: Int
    rejecteds: Int
    dayChanges: Float
  }

  type DAOAnnouncement {
    title: String
    description: String
    announcerAddress: String
    announcerAvatar: String
    createdAt: String
    updatedAt: String
    replies: Int
  }

  type DAOProposal {
    id: Int
    title: String
    description: String
    startDate: String
    endDate: String
  }

  type DAOVote {
    timestamp: String
    votes: Int
  }

  type DAOTransaction {
    age: String # TODO: number of milliseconds
    type: String
    purpose: String
    description: String
    value: String
    status: String
    hash: String
  }

  type DAOClaimStatus {
    approveds: Int
    pendings: Int
    rejecteds: Int
    disputeds: Int
    remainings: Int
  }

  type DAOOutcomeContractStatus {
    actives: Int
    completeds: Int
    totalPayments: String
    awardedPayments: String
  }

  type Asset {
    name: String
    logoUrl: String
  }
  type DAOTreasuryPool {
    totalVolumeUSD: String
    dayChanges: Float
    assets: [Asset]
  }
  type MemberSocial {
    linkedIn: String
    twitter: String
    github: String
  }
  type MemberAccount {
    ixo: String
    cosmos: String
  }
  type DAOMemberProfile {
    avatar: String
    name: String
    address: String
    role: String
    phoneNumber: String
    email: String
    socials: MemberSocial
    credentials: [String]
    accounts: MemberAccount
  }

  # Queries
  type Query {
    getAllDAOGroups(daoId: String!): [DAOGroup!]
    getMembershipInfo(daoId: String!, groupIds: [String!]): DAOGroupMembership
    getAnnouncements(
      daoId: String!
      groupIds: [String!]
      filterBy: String
      limit: Int
    ): [DAOAnnouncement]
    getProposals(daoId: String!, groupIds: [String!]): [DAOProposal]
    getVotes(daoId: String!, groupIds: [String!]): [DAOVote]
    getTransactions(daoId: String!, groupIds: [String!]): [DAOTransaction]
    getClaimStatus(daoId: String!, groupIds: [String!]): DAOClaimStatus
    getOutcomeContractStatus(
      daoId: String!
      groupIds: [String!]
    ): DAOOutcomeContractStatus
    getTreasuryPools(daoId: String!): DAOTreasuryPool
    getMembers(
      daoId: String!
      groupId: String
      status: String
      keyword: String
      sortBy: String
      order: String
    ): [DAOMember]
    getMember(address: String): DAOMember
    getMemberProfile(address: String): DAOMemberProfile
  }
`;
