import ServiceError from '@/lib/Errors';

export const handler = async (err, _, res, next) => {
  console.error(err);

  if (err instanceof ServiceError) {
    res.status(ServiceError.statuses[err.type]).json({ reason: err.type, message: err.message, ...err.context });
  } else if (err.isJoi) {
    res.status(400).json(err.details);
  } else {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
  }
};

export const missed = (req, res) => {
  res.status(404).json('API call not found!');
};
