DROP TABLE IF EXISTS `users`

DROP TABLE IF EXISTS `subscribers`
-- --------------------------------------------------------

--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `isMember` char(1) DEFAULT NULL,
  `yearJoinOasis` varchar(50) NOT NULL,
  `isWorker` char(1) NOT NULL,
  `department` varchar(50) NOT NULL,
  `phoneNumber` varchar(50) NOT NULL,
  `whatsappNumber` varchar(50) NOT NULL,
  `ageRange` varchar(50) NOT NULL,
  `hasMedicalCondition` char(1) DEFAULT NULL,
  `isMedicalPractitioner` char(1) DEFAULT NULL,
  `canLiftHeavyObject` char(1) DEFAULT NULL,
  `isWorkOffWork` char(1) DEFAULT NULL,
  `daysToBeAvailable` varchar(50) NOT NULL,
  `preferredTeam` varchar(50) NOT NULL,
  `mediaSkill` varchar(50) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `passwordHash` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `createdDate` datetime DEFAULT now(),
  `updatedDate` datetime DEFAULT now()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


  CREATE TABLE `subscribers` (
`id` INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
`email` VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Indexes for dumped tables
--
--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;



