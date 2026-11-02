const express = require('express');
const DonationTicket = require('../models/DonationTicket');
const DonationCampaign = require('../models/DonationCampaign');
const { optionalAuth, requireAuth } = require('../middleware/auth');

const router = express.Router();

function generateDefaultStages(ticketId, count, location, unitName = 'Meal') {
  const now = new Date();
  return [
    {
      stage: 'pledged',
      title: `${unitName} Donation Pledged & Allocated`,
      description: `Your contribution of ${count} ${unitName}s has been allocated to today's active community drive.`,
      timestamp: now,
      photoUrl: '/assets/donation-tracker/fd25f.png',
      geoTag: {
        location: location || 'Mangaluru Central Hub',
        coordinates: '12.8718° N, 74.8560° E',
        verified: true,
      },
      volunteer: {
        name: 'Arjun K.',
        role: 'Community Lead',
        avatar: 'AK',
      },
      completed: true,
    },
    {
      stage: 'procured',
      title: 'Materials / Items Procured & Verified',
      description: `Wholesale procurement completed directly from certified suppliers for ${count} units.`,
      timestamp: new Date(now.getTime() + 15 * 60 * 1000),
      photoUrl: '/assets/donation-tracker/405bb.png',
      geoTag: {
        location: 'Central APMC Hub, Mangaluru',
        coordinates: '12.8654° N, 74.8423° E',
        verified: true,
      },
      volunteer: {
        name: 'Sunita Rao',
        role: 'Procurement Volunteer',
        avatar: 'SR',
      },
      completed: false,
    },
    {
      stage: 'prepared',
      title: 'Sorted, Sanitized & Assembled',
      description: `All items individually inspected, quality-checked, and packed into sturdy kits.`,
      timestamp: new Date(now.getTime() + 45 * 60 * 1000),
      photoUrl: '/assets/donation-tracker/41231.png',
      geoTag: {
        location: 'Community Center, Kadri',
        coordinates: '12.8801° N, 74.8529° E',
        verified: true,
      },
      volunteer: {
        name: 'Karthik Hegde',
        role: 'Assembly Coordinator',
        avatar: 'KH',
      },
      completed: false,
    },
    {
      stage: 'distributed',
      title: 'Distributed with Live Geotagged Photo Proof',
      description: `Handed over directly to families and children with GPS verification and photo proof.`,
      timestamp: new Date(now.getTime() + 90 * 60 * 1000),
      photoUrl: '/assets/donation-tracker/ab234.png',
      geoTag: {
        location: location || 'Kadri Hills Children Shelter, Mangaluru',
        coordinates: '12.8722° N, 74.8588° E',
        verified: true,
      },
      volunteer: {
        name: 'Meera Pai',
        role: 'Field Distribution Volunteer',
        avatar: 'MP',
      },
      completed: false,
    },
  ];
}

const seedCampaigns = [
  {
    campaignId: 'CAMP-CLOTH-101',
    organizer: 'Aarav Sharma',
    title: 'Monsoon Warmth & Blanket Drive',
    description:
      'Providing warm blankets, sturdy raincoats, and clean dry clothing sets to coastal families before the rainy season.',
    category: 'Clothes',
    donationItem: 'Warm Blanket & Rainwear Kit',
    unitCost: 200,
    targetUnits: 250,
    raisedUnits: 140,
    targetAmount: 50000,
    raisedAmount: 28000,
    location: 'Malpe Coastal Settlement, Udupi',
    beneficiaryGroup: 'Fisherfolk Families & Children',
    image: '/assets/6d276.png',
    status: 'Procuring',
    currentStage: 'procured',
    stages: [
      {
        stage: 'pledged',
        title: 'Campaign Pledges & Drive Launch',
        description: 'Target of 250 blankets and warm clothing kits established.',
        timestamp: new Date(Date.now() - 48 * 3600 * 1000),
        photoUrl: '/assets/donation-tracker/fd25f.png',
        geoTag: { location: 'Town Hall, Udupi', coordinates: '13.3409° N, 74.7421° E', verified: true },
        volunteer: { name: 'Aarav Sharma', role: 'Campaign Lead', avatar: 'AS' },
        completed: true,
      },
      {
        stage: 'procured',
        title: 'Wholesale Textile Purchase Completed',
        description: '140 high-density fleece blankets and 140 rain ponchos purchased from wholesale mills.',
        timestamp: new Date(Date.now() - 12 * 3600 * 1000),
        photoUrl: '/assets/donation-tracker/405bb.png',
        geoTag: { location: 'Udupi Textile Mandi', coordinates: '13.3440° N, 74.7460° E', verified: true },
        volunteer: { name: 'Deepak Shetty', role: 'Procurement Volunteer', avatar: 'DS' },
        completed: true,
      },
      {
        stage: 'prepared',
        title: 'Washing, Sizing & Waterproof Packing',
        description: 'Volunteers bundling each blanket with rain sets in reusable fabric totes.',
        timestamp: new Date(Date.now() + 6 * 3600 * 1000),
        photoUrl: '/assets/donation-tracker/41231.png',
        geoTag: { location: 'Seva Vastra Warehouse, Udupi', coordinates: '13.3412° N, 74.7435° E', verified: true },
        volunteer: { name: 'Pooja Hegde', role: 'Packing Head', avatar: 'PH' },
        completed: false,
      },
      {
        stage: 'distributed',
        title: 'Door-to-door Coastal Distribution',
        description: 'Live geotagged delivery to families in underserved wards.',
        timestamp: new Date(Date.now() + 24 * 3600 * 1000),
        photoUrl: '/assets/donation-tracker/ab234.png',
        geoTag: { location: 'Malpe Beach Coastal Colony', coordinates: '13.3510° N, 74.7020° E', verified: true },
        volunteer: { name: 'Aarav Sharma', role: 'Field Distribution', avatar: 'AS' },
        completed: false,
      },
    ],
    expenses: [
      { id: 'exp-1', item: '140 Fleece Blankets (Wholesale)', amount: 21000, vendor: 'Karnataka Textile Co-op', receiptUrl: '', date: '2026-10-30' },
      { id: 'exp-2', item: '140 Heavy Duty Rain Ponchos', amount: 5600, vendor: 'Suraksha Rainwear', receiptUrl: '', date: '2026-10-31' },
      { id: 'exp-3', item: 'Packaging Totes & Transport', amount: 1400, vendor: 'Local Tempo Service', receiptUrl: '', date: '2026-11-01' },
    ],
    donors: [
      { ticketId: 'CLOTH-8421', donorName: 'Aarav Sharma', units: 5, amount: 1000, timestamp: new Date(Date.now() - 3 * 3600 * 1000) },
      { ticketId: 'CLOTH-9182', donorName: 'Sneha Rao', units: 3, amount: 600, timestamp: new Date(Date.now() - 5 * 3600 * 1000) },
      { ticketId: 'CLOTH-4120', donorName: 'Karthik Bhat', units: 10, amount: 2000, timestamp: new Date(Date.now() - 8 * 3600 * 1000) },
    ],
  },
  {
    campaignId: 'CAMP-STUDY-102',
    organizer: 'Aarav Sharma',
    title: 'Back-to-School Stationery & Bag Drive',
    description:
      'Equipping 500 children from government schools with sturdy backpacks, notebook sets, drawing books, and pencil boxes.',
    category: 'Education',
    donationItem: 'Complete School Learning Kit',
    unitCost: 150,
    targetUnits: 500,
    raisedUnits: 320,
    targetAmount: 75000,
    raisedAmount: 48000,
    location: 'Kadri & Bejai Govt Schools, Mangaluru',
    beneficiaryGroup: 'Primary & Middle School Children',
    image: '/assets/405bb.png',
    status: 'Active',
    currentStage: 'pledged',
    stages: [
      {
        stage: 'pledged',
        title: 'Campaign Pledges Open',
        description: 'Collecting contributions for 500 student study backpacks.',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000),
        photoUrl: '/assets/donation-tracker/fd25f.png',
        geoTag: { location: 'Mangaluru Central', coordinates: '12.8718° N, 74.8560° E', verified: true },
        volunteer: { name: 'Aarav Sharma', role: 'Lead', avatar: 'AS' },
        completed: true,
      },
      {
        stage: 'procured',
        title: 'Bulk Notebook & Bag Purchase',
        description: 'Direct procurement from educational trust publishers.',
        timestamp: new Date(Date.now() + 12 * 3600 * 1000),
        photoUrl: '/assets/donation-tracker/405bb.png',
        geoTag: { location: 'Publisher Depot, Mangaluru', coordinates: '12.8680° N, 74.8510° E', verified: true },
        volunteer: { name: 'Sunita M.', role: 'Procurement', avatar: 'SM' },
        completed: false,
      },
      {
        stage: 'prepared',
        title: 'Assembly of Learning Kits',
        description: 'Packing 6 notebooks, geometry kit, crayons, and water bottles.',
        timestamp: new Date(Date.now() + 24 * 3600 * 1000),
        photoUrl: '/assets/donation-tracker/41231.png',
        geoTag: { location: 'Community Center', coordinates: '12.8750° N, 74.8530° E', verified: true },
        volunteer: { name: 'Karthik R.', role: 'Volunteer Squad', avatar: 'KR' },
        completed: false,
      },
      {
        stage: 'distributed',
        title: 'Classroom Distribution & Live Proof',
        description: 'Handing kits to school children with live GPS verification.',
        timestamp: new Date(Date.now() + 48 * 3600 * 1000),
        photoUrl: '/assets/donation-tracker/ab234.png',
        geoTag: { location: 'Kadri Govt School', coordinates: '12.8790° N, 74.8570° E', verified: true },
        volunteer: { name: 'Aarav Sharma', role: 'Distribution', avatar: 'AS' },
        completed: false,
      },
    ],
    expenses: [
      { id: 'exp-1', item: '320 Waterproof Backpacks', amount: 28800, vendor: 'Universal Bag Factory', receiptUrl: '', date: '2026-10-28' },
      { id: 'exp-2', item: '1,920 Four-line & Square Notebooks', amount: 15360, vendor: 'Vidya Printers Co-op', receiptUrl: '', date: '2026-10-29' },
      { id: 'exp-3', item: 'Stationery Boxes & Pens', amount: 3840, vendor: 'National Stationery Mart', receiptUrl: '', date: '2026-10-30' },
    ],
    donors: [
      { ticketId: 'STUDY-3490', donorName: 'Nikhil Verma', units: 10, amount: 1500, timestamp: new Date(Date.now() - 6 * 3600 * 1000) },
      { ticketId: 'STUDY-8120', donorName: 'Sunita Murthy', units: 5, amount: 750, timestamp: new Date(Date.now() - 10 * 3600 * 1000) },
    ],
  },
];

// GET /api/donations/campaigns - List persisted donation campaigns
router.get('/campaigns', async (req, res, next) => {
  try {
    const campaigns = await DonationCampaign.find().sort({ createdAt: -1 });
    return res.json({ campaigns: campaigns.map((c) => c.toPublicJSON()) });
  } catch (error) {
    return next(error);
  }
});

// POST /api/donations/campaigns - Create a new donation campaign
router.post('/campaigns', optionalAuth, async (req, res, next) => {
  try {
    const b = req.body || {};
    const title = b.title ? b.title.trim() : '';
    const description = b.description ? b.description.trim() : '';
    const category = b.category || 'Clothes';
    const donationItem = b.donationItem ? b.donationItem.trim() : 'Item';
    const unitCost = Math.max(1, Number(b.unitCost) || 100);
    const targetUnits = Math.max(1, Number(b.targetUnits) || 100);
    const targetAmount = targetUnits * unitCost;
    const location = b.location ? b.location.trim() : 'Karnataka, India';
    const image = b.image || '/assets/6d276.png';
    const beneficiaryGroup = b.beneficiaryGroup || 'Local Community in Need';

    const campaignId = 'CAMP-' + category.toUpperCase().slice(0, 5) + '-' + Math.floor(100 + Math.random() * 900);

    const stages = [
      {
        stage: 'pledged',
        title: `${donationItem} Campaign Pledges Open`,
        description: `Target established for ${targetUnits} ${donationItem}s.`,
        timestamp: new Date(),
        photoUrl: image,
        geoTag: { location, coordinates: '12.8718° N, 74.8560° E', verified: true },
        volunteer: { name: req.user?.name || 'Aarav Sharma', role: 'Campaign Host', avatar: 'AH' },
        completed: true,
      },
      {
        stage: 'procured',
        title: `Procurement of ${donationItem}s`,
        description: 'Wholesale materials and items purchased from suppliers.',
        timestamp: new Date(Date.now() + 12 * 3600 * 1000),
        photoUrl: '/assets/donation-tracker/405bb.png',
        geoTag: { location, coordinates: '12.8718° N, 74.8560° E', verified: true },
        volunteer: { name: req.user?.name || 'Aarav Sharma', role: 'Procurement', avatar: 'AH' },
        completed: false,
      },
      {
        stage: 'prepared',
        title: 'Inspection, Sorting & Packing',
        description: 'Items assembled into ready packages for delivery.',
        timestamp: new Date(Date.now() + 24 * 3600 * 1000),
        photoUrl: '/assets/donation-tracker/41231.png',
        geoTag: { location, coordinates: '12.8718° N, 74.8560° E', verified: true },
        volunteer: { name: req.user?.name || 'Aarav Sharma', role: 'Logistics', avatar: 'AH' },
        completed: false,
      },
      {
        stage: 'distributed',
        title: 'Distribution with Live Geotagged Proof',
        description: 'Items delivered to beneficiaries with verified GPS and photos.',
        timestamp: new Date(Date.now() + 48 * 3600 * 1000),
        photoUrl: '/assets/donation-tracker/ab234.png',
        geoTag: { location, coordinates: '12.8718° N, 74.8560° E', verified: true },
        volunteer: { name: req.user?.name || 'Aarav Sharma', role: 'Distribution', avatar: 'AH' },
        completed: false,
      },
    ];

    const campaign = await DonationCampaign.create({
      campaignId,
      organizerId: req.user?._id,
      organizer: req.user?.name || 'Aarav Sharma',
      title,
      description,
      category,
      donationItem,
      unitCost,
      targetUnits,
      raisedUnits: 0,
      targetAmount,
      raisedAmount: 0,
      location,
      beneficiaryGroup,
      image,
      status: 'Active',
      currentStage: 'pledged',
      stages,
      expenses: [],
      donors: [],
    });

    return res.status(201).json({ success: true, campaign: campaign.toPublicJSON() });
  } catch (error) {
    return next(error);
  }
});

// GET /api/donations/campaigns/:id - Get campaign details
router.get('/campaigns/:id', async (req, res, next) => {
  try {
    const campaign = await DonationCampaign.findOne({
      $or: [{ campaignId: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }],
    });
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    return res.json({ campaign: campaign.toPublicJSON() });
  } catch (error) {
    return next(error);
  }
});

// POST /api/donations/campaigns/:id/broadcast-stage - Advance & broadcast stage with live photo & GPS
router.post('/campaigns/:id/broadcast-stage', optionalAuth, async (req, res, next) => {
  try {
    const { stage, photoUrl, coordinates, location, notes } = req.body || {};
    const campaign = await DonationCampaign.findOne({
      $or: [{ campaignId: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }],
    });
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const stageOrder = ['pledged', 'procured', 'prepared', 'distributed'];
    const targetStage = stage || stageOrder[Math.min(stageOrder.length - 1, stageOrder.indexOf(campaign.currentStage) + 1)];
    const targetIdx = stageOrder.indexOf(targetStage);

    campaign.currentStage = targetStage;
    campaign.status =
      targetStage === 'distributed'
        ? 'Completed'
        : targetStage === 'prepared'
        ? 'Preparing'
        : targetStage === 'procured'
        ? 'Procuring'
        : 'Active';

    campaign.stages = campaign.stages.map((st, idx) => {
      if (idx <= targetIdx) {
        st.completed = true;
      }
      if (st.stage === targetStage) {
        if (photoUrl) st.photoUrl = photoUrl;
        if (coordinates || location) {
          st.geoTag = {
            location: location || st.geoTag.location,
            coordinates: coordinates || st.geoTag.coordinates,
            verified: true,
          };
        }
        if (notes) st.description = notes;
        st.timestamp = new Date();
      }
      return st;
    });

    await campaign.save();
    return res.json({ success: true, campaign: campaign.toPublicJSON() });
  } catch (error) {
    return next(error);
  }
});

// POST /api/donations/campaigns/:id/expenses - Add expense item to transparency ledger
router.post('/campaigns/:id/expenses', optionalAuth, async (req, res, next) => {
  try {
    const { item, amount, vendor, date } = req.body || {};
    if (!item || !amount) {
      return res.status(400).json({ message: 'Item and amount are required' });
    }

    const campaign = await DonationCampaign.findOne({
      $or: [{ campaignId: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }],
    });
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const expenseEntry = {
      id: 'exp-' + Date.now(),
      item: item.trim(),
      amount: Number(amount),
      vendor: vendor ? vendor.trim() : 'Local Merchant',
      date: date || new Date().toISOString().split('T')[0],
      receiptUrl: '',
    };

    campaign.expenses.unshift(expenseEntry);
    await campaign.save();

    return res.status(201).json({ success: true, expenses: campaign.expenses });
  } catch (error) {
    return next(error);
  }
});

// POST /api/donations/ticket - Purchase feeding or item tickets
router.post('/ticket', optionalAuth, async (req, res, next) => {
  try {
    const {
      mealCount = 1,
      unitCount = 1,
      unitName = 'Meal',
      cause = 'Community Nutrition Drive',
      location = 'Kadri Hills & Coastal Shelter, Mangaluru',
      beneficiaryGroup = 'Underprivileged Children & Elders',
      dedication = '',
      donorName = '',
      donorEmail = '',
      campaignId = '',
    } = req.body || {};

    const count = Math.max(1, parseInt(unitCount || mealCount, 10) || 1);
    const amount = count * 50; // default ₹50 or calculated
    const ticketId = (unitName.toUpperCase().slice(0, 4) || 'FEED') + '-' + Math.floor(1000 + Math.random() * 9000);

    const stages = generateDefaultStages(ticketId, count, location, unitName);

    const ticket = await DonationTicket.create({
      ticketId,
      donorId: req.user?._id,
      donorName: req.user?.name || donorName.trim() || 'Generous Donor',
      donorEmail: req.user?.email || donorEmail.trim() || 'donor@sevasathi.org',
      mealCount: count,
      amount,
      cause,
      location,
      beneficiaryGroup,
      dedication: dedication.trim(),
      status: 'pledged',
      stages,
    });

    if (campaignId) {
      await DonationCampaign.findOneAndUpdate(
        { campaignId },
        {
          $inc: { raisedUnits: count, raisedAmount: amount },
          $push: { donors: { ticketId, donorName: ticket.donorName, units: count, amount, timestamp: new Date() } },
        }
      ).catch(() => {});
    }

    return res.status(201).json({
      success: true,
      ticket: ticket.toPublicJSON(),
    });
  } catch (error) {
    return next(error);
  }
});

// GET /api/donations/mine - List tickets donated by the authenticated user
router.get('/mine', requireAuth, async (req, res, next) => {
  try {
    const tickets = await DonationTicket.find({ donorId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    return res.json({ tickets: tickets.map((ticket) => ticket.toPublicJSON()) });
  } catch (error) {
    return next(error);
  }
});

// GET /api/donations/track/:ticketId - Track ticket with live proof
router.get('/track/:ticketId', async (req, res, next) => {
  try {
    const ticket = await DonationTicket.findOne({ ticketId: req.params.ticketId });
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }
    return res.json({ ticket: ticket.toPublicJSON() });
  } catch (error) {
    return next(error);
  }
});

// GET /api/donations/latest - Get the most recent persisted ticket
router.get('/latest', async (req, res, next) => {
  try {
    const ticket = await DonationTicket.findOne().sort({ createdAt: -1 });
    if (!ticket) {
      return res.status(404).json({ message: 'No donation ticket found.' });
    }
    return res.json({ ticket: ticket.toPublicJSON() });
  } catch (error) {
    return next(error);
  }
});

// POST /api/donations/:ticketId/advance - Advance to next live tracking stage
router.post('/:ticketId/advance', async (req, res, next) => {
  try {
    const ticket = await DonationTicket.findOne({ ticketId: req.params.ticketId });
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }

    const stageOrder = ['pledged', 'procured', 'prepared', 'distributed'];
    const currentIdx = stageOrder.indexOf(ticket.status);
    const nextIdx = Math.min(stageOrder.length - 1, currentIdx + 1);
    const nextStatus = stageOrder[nextIdx];

    ticket.status = nextStatus;
    ticket.stages = ticket.stages.map((st, idx) => {
      if (idx <= nextIdx) {
        st.completed = true;
      }
      return st;
    });

    await ticket.save();
    return res.json({ success: true, ticket: ticket.toPublicJSON() });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
