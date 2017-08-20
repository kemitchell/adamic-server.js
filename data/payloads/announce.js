module.exports = function announce (public) {
  return {
    type: 'announce',
    public: public.toString('hex')
  }
}
